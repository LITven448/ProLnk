import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // Detect brand from hostname
      const hostname = (req.get("host") || "prolnk.io").split(":")[0].toLowerCase();
      const isTrustyPro = hostname.includes("trustypro");

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      // Inject brand detection script
      const brandScript = `<script>window.__BRAND__='${isTrustyPro ? "trustypro" : "prolnk"}';</script>`;
      template = template.replace("</head>", `${brandScript}</head>`);

      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Serve hashed assets with long cache (immutable -- content hash changes on every build)
  app.use(
    "/assets",
    express.static(path.join(distPath, "assets"), {
      maxAge: "1y",
      immutable: true,
    })
  );

  // Serve static files (favicon, manifest, etc.) with short cache.
  // CRITICAL: index.html is explicitly forced to no-cache so browsers always
  // fetch the latest HTML shell immediately after a publish -- no hard reset needed.
  app.use(
    express.static(distPath, {
      maxAge: "1h",
      setHeaders: (res, filePath) => {
        if (filePath.endsWith("index.html")) {
          res.set({
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          });
        }
      },
    })
  );

  // Fallback: serve index.html for all SPA routes (client-side routing)
  // Always with no-cache headers so every navigation gets the freshest shell.
  app.use("*", (req, res, next) => {
    // Skip API and webhook routes—they're handled by Express middleware
    if (req.path.startsWith("/api") || req.path.startsWith("/setup")) {
      return next();
    }

    // Detect brand from hostname
    const hostname = (req.get("host") || "prolnk.io").split(":")[0].toLowerCase();
    const isTrustyPro = hostname.includes("trustypro");

    let indexHtml = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");
    const brandScript = `<script>window.__BRAND__='${isTrustyPro ? "trustypro" : "prolnk"}';</script>`;
    indexHtml = indexHtml.replace("</head>", `${brandScript}</head>`);

    res.set({
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });
    res.send(indexHtml);
  });
}
