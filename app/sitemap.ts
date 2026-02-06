import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yourdomain.com",
      lastModified: new Date(),
    },
    {
      url: "https://yourdomain.com/jobs",
      lastModified: new Date(),
    },
    {
      url: "https://yourdomain.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://yourdomain.com/privacy-policy",
      lastModified: new Date(),
    },
    {
      url: "https://yourdomain.com/terms",
      lastModified: new Date(),
    },
    {
      url: "https://yourdomain.com/disclaimer",
      lastModified: new Date(),
    },
  ];
}
