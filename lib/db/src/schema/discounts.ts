import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const discountsTable = pgTable("discounts", {
  id: serial("id").primaryKey(),
  firmName: text("firm_name").notNull(),
  realCode: text("real_code").notNull(),
  discountPercent: integer("discount_percent").notNull(),
  affiliateLink: text("affiliate_link").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertDiscountSchema = createInsertSchema(discountsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const selectDiscountSchema = createSelectSchema(discountsTable);

export type InsertDiscount = z.infer<typeof insertDiscountSchema>;
export type Discount = typeof discountsTable.$inferSelect;
