import { eq } from "drizzle-orm";
import { db, dbCertificate, dbCourse } from "..";
import type { NewCourse } from "../schema/course";

export const insertDbCourse = async (params: NewCourse) => {
  const result = await db.insert(dbCourse).values(params);
  return {
    success: result.rowCount === 1,
  };
};

export const getDbCourseById = async (id: string) => {
  const course = await db.query.dbCourse.findFirst({
    where: eq(dbCourse.id, id),
    with: {
      certificates: {
        orderBy: (cert, { asc }) => [asc(cert.id)],
        with: {
          course: {
            columns: {
              name: true,
              shortName: true,
            },
          },
        },
      },
    },
  });
  return course ?? null;
};

export const getDbCoursesByCreator = async (
  creator: string,
  withCertificates: boolean = false
) => {
  return db.query.dbCourse.findMany({
    where: eq(dbCourse.creator, creator),
    with: withCertificates
      ? {
          certificates: true,
        }
      : {},
  });
};

export const getDbStatisticsCourseByCreator = async (creator: string) => {
  const provider = await db.query.dbProvider.findFirst({
    where: eq(dbCourse.creator, creator),
  });
  if (!provider) {
    return {
      totalCourses: 0,
      totalCertificates: 0,
      totalMintedCertificates: 0,
    };
  }

  const totalCourses = await db.$count(
    dbCourse,
    eq(dbCourse.providerId, provider.id)
  );

  const certificateRecords = await db
    .select({
      id: dbCertificate.id,
      nftMint: dbCertificate.nftMint,
    })
    .from(dbCourse)
    .where(eq(dbCourse.providerId, provider.id))
    .innerJoin(dbCertificate, eq(dbCertificate.courseId, dbCourse.id));

  return {
    totalCourses,
    totalCertificates: certificateRecords.length,
    totalMintedCertificates: certificateRecords.filter(
      (c) => c.nftMint !== null
    ).length,
  };
};
