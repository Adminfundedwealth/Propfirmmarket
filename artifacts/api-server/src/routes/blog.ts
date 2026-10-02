import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import rateLimit from "express-rate-limit";
import { db, isDbConfigured } from "@workspace/db";
import { blogsTable } from "@workspace/db/schema";
import { eq, desc, sql, ne } from "drizzle-orm";
import {
  generateBlogPost,
  generateSocialContent,
  addInternalLinks,
  pickDailyKeyword,
  pickRandomKeyword,
  SEO_KEYWORDS,
  type RelatedBlog,
} from "../lib/ai.js";
import {
  createGeneratedFallbackBlog,
  getFallbackBlogBySlug,
  getFallbackBlogSummaries,
} from "../lib/blog-content.js";
import { logger } from "../lib/logger.js";

const router: IRouter = Router();

function adminAuth(req: Request, res: Response, next: NextFunction) {
  const key = req.headers["x-admin-key"];
  if (!process.env.ADMIN_API_KEY) {
    next();
    return;
  }

  if (!key || key !== process.env.ADMIN_API_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

function hasDatabase() {
  return isDbConfigured && Boolean(db);
}

const generateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: "Blog generation rate limit exceeded. Try again later." },
});

router.post("/blog/generate", adminAuth, generateLimiter, async (req, res) => {
  try {
    const keyword =
      (req.body as { keyword?: string }).keyword ||
      (req.query.random === "true" ? pickRandomKeyword() : pickDailyKeyword());

    logger.info({ keyword }, "Generating blog post");

    if (!hasDatabase()) {
      const fallback = createGeneratedFallbackBlog(keyword);
      // Preserve the shape expected by the frontend and local CMS workflows.
      res.json({
        success: true,
        blog: fallback,
        url: `/blog/${fallback.slug}`,
        socialContent: JSON.parse(fallback.socialContent),
        socialMessage: JSON.parse(fallback.socialContent).twitter,
      });
      return;
    }

    const generated = await generateBlogPost(keyword);

    const existing = await db
      .select({ id: blogsTable.id })
      .from(blogsTable)
      .where(eq(blogsTable.slug, generated.slug))
      .limit(1);

    if (existing.length > 0) {
      generated.slug = `${generated.slug}-${Date.now()}`;
    }

    const recentBlogs = await db
      .select({ slug: blogsTable.slug, title: blogsTable.title })
      .from(blogsTable)
      .orderBy(desc(blogsTable.publishedAt))
      .limit(4) as RelatedBlog[];

    const { content: linkedContent, usedLinks } = addInternalLinks(
      generated.content,
      recentBlogs.filter(b => b.slug !== generated.slug).slice(0, 3),
    );

    logger.info({ keyword }, "Generating social content");
    const socialContent = await generateSocialContent(
      generated.title,
      generated.slug,
      generated.keyword,
      generated.metaDescription,
    );

    const [blog] = await db
      .insert(blogsTable)
      .values({
        title: generated.title,
        slug: generated.slug,
        keyword: generated.keyword,
        metaDescription: generated.metaDescription,
        content: linkedContent,
        readTime: generated.readTime,
        category: generated.category,
        tags: generated.tags,
        socialContent: JSON.stringify(socialContent),
        internalLinks: JSON.stringify(usedLinks),
      })
      .returning();

    const blogUrl = `/blog/${blog.slug}`;
    logger.info({ blogUrl, title: blog.title }, "Blog published with social content");

    res.json({
      success: true,
      blog,
      url: blogUrl,
      socialContent,
      socialMessage: socialContent.twitter,
    });
  } catch (err) {
    logger.error({ err }, "Failed to generate blog post");
    res.status(500).json({ error: "Failed to generate blog post" });
  }
});

router.get("/blogs", async (_req, res) => {
  try {
    if (!hasDatabase()) {
      res.json({ success: true, blogs: getFallbackBlogSummaries() });
      return;
    }

    const blogs = await db
      .select({
        id: blogsTable.id,
        title: blogsTable.title,
        slug: blogsTable.slug,
        keyword: blogsTable.keyword,
        metaDescription: blogsTable.metaDescription,
        readTime: blogsTable.readTime,
        category: blogsTable.category,
        tags: blogsTable.tags,
        views: blogsTable.views,
        socialContent: blogsTable.socialContent,
        internalLinks: blogsTable.internalLinks,
        publishedAt: blogsTable.publishedAt,
      })
      .from(blogsTable)
      .orderBy(desc(blogsTable.publishedAt))
      .limit(50);

    res.json({ success: true, blogs });
  } catch (err) {
    logger.error({ err }, "Failed to fetch blogs");
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

router.get("/blog/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    if (!hasDatabase()) {
      const blog = getFallbackBlogBySlug(slug);
      if (!blog) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      return res.json({
        success: true,
        blog: {
          ...blog,
          views: blog.views + 1,
          tags: blog.tags,
        },
        related: getFallbackBlogSummaries().filter((item) => item.slug !== slug).slice(0, 3),
      });
    }

    const [blog] = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.slug, slug))
      .limit(1);

    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    await db
      .update(blogsTable)
      .set({ views: sql`${blogsTable.views} + 1` })
      .where(eq(blogsTable.id, blog.id));

    const related = await db
      .select({ slug: blogsTable.slug, title: blogsTable.title, category: blogsTable.category })
      .from(blogsTable)
      .where(ne(blogsTable.slug, slug))
      .orderBy(desc(blogsTable.publishedAt))
      .limit(3);

    return res.json({ success: true, blog: { ...blog, views: blog.views + 1 }, related });
  } catch (err) {
    logger.error({ err }, "Failed to fetch blog post");
    return res.status(500).json({ error: "Failed to fetch blog post" });
  }
});

router.get("/blog-keywords", (_req, res) => {
  res.json({ success: true, keywords: SEO_KEYWORDS });
});

router.get("/blog-stats", async (_req, res) => {
  try {
    if (!hasDatabase()) {
      const fallbackBlogs = getFallbackBlogSummaries();
      const totalViews = fallbackBlogs.reduce((sum, blog) => sum + Number(blog.views || 0), 0);
      res.json({
        success: true,
        stats: {
          totalPosts: fallbackBlogs.length,
          totalViews,
          totalInternalLinks: fallbackBlogs.length,
          avgViewsPerPost: fallbackBlogs.length ? Math.round(totalViews / fallbackBlogs.length) : 0,
        },
      });
      return;
    }

    const blogs = await db
      .select({
        id: blogsTable.id,
        views: blogsTable.views,
        internalLinks: blogsTable.internalLinks,
      })
      .from(blogsTable);

    const blogRows = blogs as Array<{ views: number; internalLinks: string }>;
    const totalViews = blogRows.reduce((sum, blog) => sum + blog.views, 0);
    const totalLinks = blogRows.reduce((sum, blog) => {
      try { return sum + (JSON.parse(blog.internalLinks) as string[]).length; } catch { return sum; }
    }, 0);

    res.json({
      success: true,
      stats: {
        totalPosts: blogs.length,
        totalViews,
        totalInternalLinks: totalLinks,
        avgViewsPerPost: blogs.length ? Math.round(totalViews / blogs.length) : 0,
      },
    });
  } catch (err) {
    logger.error({ err }, "Failed to fetch blog stats");
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
