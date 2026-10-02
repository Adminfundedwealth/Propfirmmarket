import { Router, type IRouter } from "express";
import healthRouter from "./health";
import blogRouter from "./blog.js";
import dealsRouter from "./deals.js";
import sitemapRouter from "./sitemap.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(blogRouter);
router.use(dealsRouter);
router.use(sitemapRouter);

export default router;
