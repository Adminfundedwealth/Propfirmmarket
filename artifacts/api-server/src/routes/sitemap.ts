import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { blogsTable } from "@workspace/db/schema";
import { firms } from "../../../propfirmmarket/src/data/firms";
import { getFirmSlug } from "../../../propfirmmarket/src/lib/firmService";
import { challengeService } from "../../../propfirmmarket/src/lib/challengeService";

const router: IRouter = Router();

const SITE = "https://propfirmmarket.in";

const STATIC_PAGES = [
  { loc: "/", priority: "1.0", changefreq: "daily" },
  { loc: "/firms", priority: "0.9", changefreq: "daily" },
  { loc: "/challenges", priority: "0.9", changefreq: "daily" },
  { loc: "/blog", priority: "0.8", changefreq: "daily" },
];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toW3CDate(date: Date | string | null): string {
  if (!date) return new Date().toISOString().split("T")[0];
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().split("T")[0];
}

router.get("/sitemap.xml", async (_req, res) => {
  try {
    const blogs = (await db
      .select({
        slug: blogsTable.slug,
        publishedAt: blogsTable.publishedAt,
        createdAt: blogsTable.createdAt,
      })
      .from(blogsTable)) as Array<{
      slug: string;
      publishedAt: Date | string | null;
      createdAt: Date | string | null;
    }>;

    const firmUrls = firms.map((firm) => ({
      loc: `/firm/${getFirmSlug(firm)}`,
      lastmod: new Date().toISOString().split("T")[0],
      priority: "0.8",
      changefreq: "weekly",
    }));

    const challengeUrls = (await challengeService.list()).map((challenge) => ({
      loc: `/challenge/${challenge.slug}`,
      lastmod: new Date().toISOString().split("T")[0],
      priority: "0.7",
      changefreq: "weekly",
    }));

    const blogUrls = blogs.map((blog) => ({
      loc: `/blog/${blog.slug}`,
      lastmod: toW3CDate(blog.publishedAt || blog.createdAt),
      priority: "0.7",
      changefreq: "weekly",
    }));

    const today = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    for (const page of STATIC_PAGES) {
      xml += `  <url>
    <loc>${escapeXml(SITE + page.loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    }

    for (const entry of [...firmUrls, ...challengeUrls, ...blogUrls]) {
      xml += `  <url>
    <loc>${escapeXml(SITE + entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>
`;
    }

    xml += `</urlset>`;

    res.set("Content-Type", "application/xml");
    res.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
    res.send(xml);
  } catch (err) {
    res.status(500).set("Content-Type", "application/xml").send(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}/</loc>
    <priority>1.0</priority>
  </url>
</urlset>`
    );
  }
});

export default router;
