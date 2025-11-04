import { getSupabasePublicUrl } from "@/server/storage";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateIdFromTimestamp() {
  return Math.floor(new Date().getTime());
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

export const toPrivyId = (did: string) => {
  return did.replace("did:privy:", "");
};

export const toDidPrivy = (privyId: string) => {
  return `did:privy:${privyId}`;
};

export const getCourseImageUrl = (courseId: string) => {
  return getSupabasePublicUrl(
    process.env.NEXT_PUBLIC_STORAGE_COURSE_BUCKET!,
    `image_${courseId}`
  );
};

export const getProviderImageUrl = (providerId: string) => {
  return getSupabasePublicUrl(
    process.env.NEXT_PUBLIC_STORAGE_PROVIDER_BUCKET!,
    `image_${providerId}`
  );
};

export const getCourseImageUrlSync = (courseId: string) => {
  const bucket = process.env.NEXT_PUBLIC_STORAGE_COURSE_BUCKET;
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL;
  return `${projectUrl}/storage/v1/object/public/${bucket}/image_${courseId}`;
};

export const getProviderImageUrlSync = (providerId: string) => {
  const bucket = process.env.NEXT_PUBLIC_STORAGE_PROVIDER_BUCKET;
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL;
  return `${projectUrl}/storage/v1/object/public/${bucket}/image_${providerId}`;
};

// Proxy URL helpers - use these for better caching
export const getCourseImageProxyUrl = (courseId: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL!}/image/course/${courseId}`;
};

export const getProviderImageProxyUrl = (providerId: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL!}/image/provider/${providerId}`;
};
