import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { appUrl } from "@/lib/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function absoluteUrl(pathname: string) {
  return new URL(pathname, appUrl).toString();
}

export function getFileIfPresent(entry: FormDataEntryValue | null) {
  if (!(entry instanceof File) || entry.size === 0) {
    return null;
  }

  return entry;
}
