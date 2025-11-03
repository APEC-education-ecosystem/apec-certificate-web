"use server";
import {
  dbProvider,
  insertDbProvider,
  getDbProviderByCreator,
} from "@apec-learning/db";
import { revalidatePath } from "next/cache";

type NewProvider = typeof dbProvider.$inferInsert;

export async function insertProvider(params: NewProvider) {
  const result = await insertDbProvider(params);
  if (result.success) {
    revalidatePath("/app/provider");
  }
  return result;
}

export async function getProviderByCreator(creator: string) {
  return getDbProviderByCreator(creator);
}
