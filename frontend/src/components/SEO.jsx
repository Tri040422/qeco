import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, image, url }) {
  const t = title ? `${title} | QeCo` : "QeCo - Sản phẩm thân thiện môi trường";
  return (
    <Helmet>
      <title>{t}</title>
      {description && <meta name="description" content={description} />}
      {url && <link rel="canonical" href={url} />}

      <meta property="og:title" content={t} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
}
