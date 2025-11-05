import type { getCertificatesByUser } from "@/server/certificate";
import type { getCourseById } from "@/server/course";

export interface SupabaseUploadOptions {
  bucket: string;
  folder?: string;
  fileName?: string;
  onProgress?: (progress: number) => void;
}

export interface SupabaseUploadResult {
  success: boolean;
  url?: string;
  path?: string;
  fullPath?: string;
}

export class SupabaseUploadError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = "SupabaseUploadError";
  }
}

export interface CertificateItem {
  address: string;
  name: string;
}

export type MyId = string | number | bigint;

export type Certificate =
  | NonNullable<
      Awaited<ReturnType<typeof getCourseById>>
    >["certificates"][number]
  | NonNullable<Awaited<ReturnType<typeof getCertificatesByUser>>>[number];

export interface NftMetadata {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  animation_url?: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
  properties?: {
    files?: Array<{
      uri: string;
      type: string;
    }>;
    category?: string;
  };
}
