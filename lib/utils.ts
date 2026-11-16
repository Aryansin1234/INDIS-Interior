import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { collections, projects, services, articles } from "@/data/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function toTitleCase(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
