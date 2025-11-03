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
