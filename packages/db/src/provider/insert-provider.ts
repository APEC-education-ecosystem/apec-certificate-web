import { db } from "..";
import { dbProvider, type NewProvider } from "../schema/provider";

export async function insertDbProvider(params: NewProvider) {
  const result = await db.insert(dbProvider).values(params);
  return {
    success: result.rowCount === 1,
  };
}
