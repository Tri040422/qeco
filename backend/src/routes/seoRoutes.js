import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/sitemap.xml", async (_req, res) => {
  const base =
    process.env.FRONTEND_URL?.replace(/\/$/, "") ||
    "https://qeco-frontend-4exr.onrender.com";
  const products = await Product.find({}, "_id updatedAt").lean();
  const urls = [
    { loc: `${base}/`, priority: "1.0" },
    { loc: `${base}/products`, priority: "0.8" },
    { loc: `${base}/contact`, priority: "0.5" },
    { loc: `${base}/faq`, priority: "0.5" },
    ...products.map((p) => ({
      loc: `${base}/product/${p._id}`,
      lastmod: new Date(p.updatedAt || Date.now()).toISOString(),
      priority: "0.7",
    })),
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls
      .map(
        (u) =>
          `<url><loc>${u.loc}</loc>${
            u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""
          }<priority>${u.priority}</priority></url>`
      )
      .join("") +
    `</urlset>`;

  res.header("Content-Type", "application/xml").send(xml);
});

router.get("/robots.txt", (_req, res) => {
  const base =
    process.env.FRONTEND_URL?.replace(/\/$/, "") ||
    "https://qeco-frontend-4exr.onrender.com";
  res.type("text/plain").send(
    `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`
  );
});

export default router;
