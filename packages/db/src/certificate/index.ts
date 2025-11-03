import { and, eq } from "drizzle-orm";
import { db, dbCertificate, type NewCertificate } from "..";

export const insertDbCertificateToCourse = async (params: NewCertificate[]) => {
  const result = await db.insert(dbCertificate).values(params);
  return {
    success: result.rowCount === params.length,
  };
};

export const getDbCertificatesByCourseId = async (courseId: string) => {
  const certificates = await db
    .select()
    .from(dbCertificate)
    .where(eq(dbCertificate.courseId, courseId));

  return certificates;
};

export const getDbCertificateById = async (id: number) => {
  const certificate = await db.query.dbCertificate.findFirst({
    where: eq(dbCertificate.id, id),
  });
  return certificate ?? null;
};

export const getDbCertificateByCourseAndWallet = async (
  courseId: string,
  walletAddress: string
) => {
  const certificate = await db.query.dbCertificate.findFirst({
    where: and(
      eq(dbCertificate.courseId, courseId),
      eq(dbCertificate.wallet, walletAddress)
    ),
  });
  return certificate ?? null;
};

export const updateDbCertificateNftMint = async (
  id: number,
  nftMint: string,
  txHash: string
) => {
  const result = await db
    .update(dbCertificate)
    .set({ nftMint, txHash })
    .where(eq(dbCertificate.id, id));
  return {
    success: result.rowCount === 1,
  };
};
