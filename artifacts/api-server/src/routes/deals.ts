import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { db } from "@workspace/db";
import { discountsTable } from "@workspace/db/schema";
import { eq, and, or, isNull, gt } from "drizzle-orm";
import { logger } from "../lib/logger.js";

const router: IRouter = Router();

function adminAuth(req: Request, res: Response, next: NextFunction) {
  const key = req.headers["x-admin-key"];
  if (!key || key !== process.env.ADMIN_API_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

router.get("/deals", async (_req, res) => {
  try {
    const now = new Date();
    const deals = await db
      .select({
        id: discountsTable.id,
        firmName: discountsTable.firmName,
        discountPercent: discountsTable.discountPercent,
        affiliateLink: discountsTable.affiliateLink,
        expiresAt: discountsTable.expiresAt,
      })
      .from(discountsTable)
      .where(
        and(
          eq(discountsTable.isActive, true),
          or(isNull(discountsTable.expiresAt), gt(discountsTable.expiresAt, now))
        )
      );

    res.json({ success: true, deals });
  } catch (err) {
    logger.error({ err }, "Failed to fetch deals");
    res.status(500).json({ error: "Failed to fetch deals" });
  }
});

router.get("/deal/:firm", async (req, res) => {
  try {
    const firmSlug = req.params.firm.toLowerCase().replace(/-/g, " ");
    const now = new Date();

    const [deal] = await db
      .select()
      .from(discountsTable)
      .where(
        and(
          eq(discountsTable.isActive, true),
          or(isNull(discountsTable.expiresAt), gt(discountsTable.expiresAt, now))
        )
      )
      .limit(50);

    const matched = deal && (
      deal.firmName.toLowerCase() === firmSlug ||
      deal.firmName.toLowerCase().replace(/\s/g, "-") === req.params.firm.toLowerCase()
    );

    if (!matched) {
      return res.status(404).json({ error: "Deal not found or expired" });
    }

    logger.info({ firm: deal.firmName, link: deal.affiliateLink }, "Deal redirect");
    return res.redirect(302, deal.affiliateLink);
  } catch (err) {
    logger.error({ err }, "Failed to redirect deal");
    return res.status(500).json({ error: "Redirect failed" });
  }
});

router.post("/deals/update", adminAuth, async (req, res) => {
  try {
    const body = req.body as {
      firmName?: string;
      realCode?: string;
      discountPercent?: number;
      affiliateLink?: string;
      isActive?: boolean;
      expiresAt?: string;
      action?: "upsert" | "deactivate" | "activate";
    };

    if (!body.firmName) {
      return res.status(400).json({ error: "firmName is required" });
    }

    const action = body.action || "upsert";

    if (action === "deactivate") {
      await db
        .update(discountsTable)
        .set({ isActive: false, updatedAt: new Date() })
        .where(eq(discountsTable.firmName, body.firmName));
      return res.json({ success: true, message: `Deactivated all deals for ${body.firmName}` });
    }

    if (action === "activate") {
      await db
        .update(discountsTable)
        .set({ isActive: true, updatedAt: new Date() })
        .where(eq(discountsTable.firmName, body.firmName));
      return res.json({ success: true, message: `Activated all deals for ${body.firmName}` });
    }

    if (!body.realCode || !body.discountPercent || !body.affiliateLink) {
      return res.status(400).json({ error: "realCode, discountPercent, and affiliateLink are required for upsert" });
    }

    const existing = await db
      .select({ id: discountsTable.id })
      .from(discountsTable)
      .where(eq(discountsTable.firmName, body.firmName))
      .limit(1);

    const values = {
      firmName: body.firmName,
      realCode: body.realCode,
      discountPercent: body.discountPercent,
      affiliateLink: body.affiliateLink,
      isActive: body.isActive !== undefined ? body.isActive : true,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
      updatedAt: new Date(),
    };

    if (existing.length > 0) {
      await db
        .update(discountsTable)
        .set(values)
        .where(eq(discountsTable.firmName, body.firmName));
      return res.json({ success: true, action: "updated", firm: body.firmName });
    }

    const [created] = await db
      .insert(discountsTable)
      .values(values)
      .returning({ id: discountsTable.id });

    return res.json({ success: true, action: "created", id: created.id, firm: body.firmName });
  } catch (err) {
    logger.error({ err }, "Failed to update deal");
    return res.status(500).json({ error: "Failed to update deal" });
  }
});

router.get("/deals/admin", adminAuth, async (_req, res) => {
  try {
    const all = await db
      .select()
      .from(discountsTable)
      .orderBy(discountsTable.firmName);
    res.json({ success: true, deals: all });
  } catch (err) {
    logger.error({ err }, "Failed to fetch admin deals");
    res.status(500).json({ error: "Failed to fetch deals" });
  }
});

export default router;
