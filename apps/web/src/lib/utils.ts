import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateIdFromTimestamp() {
  return Math.floor(new Date().getTime() / 1000);
}

export function handleCopyText(text?: string) {
  if (!text) {
    return;
  }
  if (
    typeof globalThis === "undefined" ||
    !globalThis.navigator ||
    !globalThis.navigator.clipboard ||
    !globalThis.navigator.clipboard.writeText
  ) {
    return;
  }
  void globalThis.navigator.clipboard.writeText(text);
}
