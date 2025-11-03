"use server";

import type { CertificateItem } from "@/lib/types";
import {
  type dbCertificate,
  insertDbCourse,
  type dbCourse,
  insertDbCertificateToCourse,
  getDbCoursesByCreator,
  getDbCertificatesByCourseId,
  getDbCourseById,
  updateDbCertificateNftMint,
} from "@apec-learning/db";
import { getUser } from "./user-action";
import { privyServerClient } from "@/lib/privy";
import { getSupabasePublicUrl } from "./storage";
import { revalidatePath } from "next/cache";

type NewCourse = typeof dbCourse.$inferInsert;
export const insertCourse = async (params: NewCourse) => {
  const result = await insertDbCourse(params);
  if (result.success) {
    revalidatePath("/app/course");
  }
  return result;
};

type NewCertificate = typeof dbCertificate.$inferInsert;

export const insertCertificateToCourse = async (
  creator: string,
  courseId: string,
  certList: CertificateItem[]
) => {
  const params: NewCertificate[] = certList.map((cert) => ({
    courseId: courseId,
    name: cert.name,
    wallet: cert.address,
    creator,
  }));
  const result = await insertDbCertificateToCourse(params);
  if (result.success) {
    revalidatePath(`/app/course/${courseId}`);
  }
  return result;
};

export const getMyCourses = async () => {
  const user = await getUser();

  if (!user.data?.success) {
    return [];
  }
  const wallets = await privyServerClient
    .wallets()
    .list({ chain_type: "solana", user_id: user.data?.data?.id || "" });

  const currentWallet = wallets.data[0];
  if (!currentWallet) {
    return [];
  }

  const coursesFromDb = await getDbCoursesByCreator(currentWallet.address);

  return Promise.all(
    coursesFromDb.map(async (course) => ({
      ...course,
      image: await getSupabasePublicUrl(
        process.env.NEXT_PUBLIC_STORAGE_COURSE_BUCKET!,
        `image_${course.id}`
      ),
    }))
  );
};

export const getCertificatesByCourseId = async (courseId: string) => {
  return getDbCertificatesByCourseId(courseId);
};

export const getCourseById = async (id: string) => {
  const course = await getDbCourseById(id);
  if (!course) {
    return null;
  }

  const image = await getSupabasePublicUrl(
    process.env.NEXT_PUBLIC_STORAGE_COURSE_BUCKET!,
    `image_${course.id}`
  );

  return {
    ...course,
    image,
  };
};

export const updateCertificate = async (
  courseId: string,
  id: number,

  nftMint: string,
  txHash: string
) => {
  const result = await updateDbCertificateNftMint(id, nftMint, txHash);
  if (result.success) {
    revalidatePath(`/app/course/${courseId}`);
  }
  return result;
};
