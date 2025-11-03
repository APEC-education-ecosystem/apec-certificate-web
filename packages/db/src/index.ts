import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import * as relations from "./relations";
export const db = drizzle(process.env.DATABASE_URL || "", {
  schema: { ...schema, ...relations },
});

export * from "./schema/provider";
export * from "./schema/course";
export * from "./schema/certificate";
export * from "./provider";
export * from "./course";
export * from "./certificate";
