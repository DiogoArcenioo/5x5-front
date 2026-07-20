import type { MetadataRoute } from "next";
import { siteUrl } from "./site-config";

const publicPages: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/inicio", changeFrequency: "weekly", priority: 1 },
  { path: "/jogar", changeFrequency: "weekly", priority: 0.9 },
  { path: "/ranking", changeFrequency: "daily", priority: 0.8 },
  { path: "/regras", changeFrequency: "monthly", priority: 0.7 },
  { path: "/sobre", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacidade", changeFrequency: "yearly", priority: 0.4 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.4 },
  { path: "/termos", changeFrequency: "yearly", priority: 0.4 },
  { path: "/jogadores", changeFrequency: "weekly", priority: 0.6 },
  { path: "/times", changeFrequency: "weekly", priority: 0.6 },
  { path: "/temporadas", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPages.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    changeFrequency,
    priority,
  }));
}
