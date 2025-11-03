import { eq } from "drizzle-orm";
import { db, dbCourse } from "..";
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
      certificates: true,
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
