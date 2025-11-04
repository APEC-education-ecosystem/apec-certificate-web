"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { type SupabaseUploadResult } from "@/lib/types";

/**
 * Upload a file to Supabase Storage
 * @param file - The file to upload
 * @param options - Upload options
 * @returns Promise<SupabaseUploadResult>
 */
export const uploadToSupabase = async (
  file: File,
  filePath: string,
  bucket: string
): Promise<SupabaseUploadResult> => {
  try {
    const supabase = await createSupabaseServerClient();

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return {
        success: false,
      };
    }

    // Get public URL for the uploaded file
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return {
      success: true,
      url: publicUrl,
      path: data.path,
      fullPath: data.fullPath,
    };
  } catch (error) {
    console.error("Supabase upload error:", error);
    return {
      success: false,
    };
  }
};

/**
 * Delete a file from Supabase Storage
 * @param bucket - The storage bucket
 * @param path - The file path
 * @returns Promise<void>
 */
export const deleteFromSupabase = async (
  bucket: string,
  path: string
): Promise<{ success: boolean }> => {
  try {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

/**
 * Get public URL for a file in Supabase Storage
 * @param bucket - The storage bucket
 * @param path - The file path
 * @returns string
 */
export const getSupabasePublicUrl = async (
  bucket: string,
  path: string
): Promise<string> => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return publicUrl;
};
