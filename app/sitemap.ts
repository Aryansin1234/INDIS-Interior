import type { MetadataRoute } from "next";
import { articles, collections, pages, projects, services } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://indisinteriors.com";
  const staticPages = pages.map((page) => ({ url: `${base}${page}`, lastModified: new Date() }));
  const projectPages = projects.map((project) => ({ url: `${base}/projects/${project.slug}`, lastModified: new Date() }));
  const collectionPages = collections.map((collection) => ({ url: `${base}/collections/${collection.slug}`, lastModified: new Date() }));
  const servicePages = services.map((service) => ({ url: `${base}/services/${service.slug}`, lastModified: new Date() }));
  const articlePages = articles.map((article) => ({ url: `${base}/journal/${article.slug}`, lastModified: new Date() }));
  return [...staticPages, ...projectPages, ...collectionPages, ...servicePages, ...articlePages];
}
