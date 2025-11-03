import { relations } from "drizzle-orm";
import { dbCertificate, dbCourse, dbProvider } from "./schema";

export const dbProviderRelations = relations(dbProvider, ({ many }) => ({
  courses: many(dbCourse),
}));

export const dbCourseRelations = relations(dbCourse, ({ one, many }) => ({
  provider: one(dbProvider, {
    fields: [dbCourse.providerId],
    references: [dbProvider.id],
    relationName: "provider",
  }),
  certificates: many(dbCertificate),
}));

export const dbCertificateRelations = relations(dbCertificate, ({ one }) => ({
  course: one(dbCourse, {
    fields: [dbCertificate.courseId],
    references: [dbCourse.id],
    relationName: "course",
  }),
}));
