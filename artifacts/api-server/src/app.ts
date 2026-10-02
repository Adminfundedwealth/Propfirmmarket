import express, { type Express } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import rateLimit from "express-rate-limit";
import router from "./routes";
import { logger } from "./lib/logger";
import { startCronJobs } from "./lib/cron.js";

const app: Express = express();
const publicDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../propfirmmarket/dist/public",
);

app.use(helmet({ contentSecurityPolicy: false }));

const allowedHostnames = new Set([
  "propfirmmarket.in",
  "terminal.propfirmmarket.in",
  "championships.propfirmmarket.in",
]);
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || process.env.NODE_ENV === "development") {
        cb(null, true);
        return;
      }
      try {
        const hostname = new URL(origin).hostname;
        if (
          allowedHostnames.has(hostname) ||
          hostname.endsWith(".replit.dev") ||
          hostname.endsWith(".replit.app")
        ) {
          cb(null, true);
          return;
        }
      } catch {}
      cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.set("trust proxy", 1);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later" },
  }),
);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use(express.static(publicDirectory));
app.use((req, res, next) => {
  if (
    req.method !== "GET" ||
    req.path.startsWith("/api") ||
    !req.accepts("html")
  ) {
    next();
    return;
  }

  res.sendFile(path.join(publicDirectory, "index.html"));
});

if (process.env.NODE_ENV !== "test") {
  startCronJobs();
}

export default app;
