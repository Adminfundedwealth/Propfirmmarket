import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const blogsTable = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  keyword: text("keyword").notNull(),
  metaDescription: text("meta_description").notNull(),
  content: text("content").notNull(),
  readTime: integer("read_time").notNull().default(7),
  category: text("category").notNull().default("Guide"),
  tags: text("tags").notNull().default("[]"),
  views: integer("views").notNull().default(0),
  socialContent: text("social_content").notNull().default("{}"),
  internalLinks: text("internal_links").notNull().default("[]"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
});

export const insertBlogSchema = createInsertSchema(blogsTable).omit({
  id: true,
  createdAt: true,
  publishedAt: true,
  views: true,
});

export const selectBlogSchema = createSelectSchema(blogsTable);

export type InsertBlog = z.infer<typeof insertBlogSchema>;
export type Blog = typeof blogsTable.$inferSelect;
