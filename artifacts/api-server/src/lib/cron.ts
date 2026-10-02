import cron from "node-cron";
import { logger } from "./logger.js";

export function startCronJobs() {
  logger.info("Starting cron jobs");

  cron.schedule("0 6 * * *", async () => {
    logger.info("Running daily blog generation cron");
    try {
      const base = process.env.REPLIT_DEV_DOMAIN
        ? `https://${process.env.REPLIT_DEV_DOMAIN}`
        : `http://localhost:${process.env.PORT}`;

      const res = await fetch(`${base}/api/blog/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": process.env.ADMIN_API_KEY || "",
        },
        body: JSON.stringify({}),
      });

      const data = await res.json() as { success?: boolean; blog?: { title: string }; url?: string; socialMessage?: string; error?: string };
      if (data.success) {
        logger.info(
          {
            title: data.blog?.title,
            url: data.url,
            socialMessage: data.socialMessage,
          },
          "Daily blog published successfully",
        );
      } else {
        logger.error({ error: data.error }, "Daily blog generation failed");
      }
    } catch (err) {
      logger.error({ err }, "Cron blog generation error");
    }
  }, {
    timezone: "Asia/Kolkata",
  });

  logger.info("Cron jobs started — daily blog at 06:00 IST");
}
