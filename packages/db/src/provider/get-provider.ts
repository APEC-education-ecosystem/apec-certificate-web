import { db } from "..";
import { dbProvider } from "../schema/provider";
import { eq } from "drizzle-orm";

export async function getDbProviderByCreator(creator: string) {
  const provider = await db.query.dbProvider.findFirst({
    where: eq(dbProvider.creator, creator),
  });
  if (!provider) {
    return null;
  }

  return {
    id: provider.id,
    fullName: provider.fullName,
    shortName: provider.shortName,
    description: provider.description,
    country: provider.country,
    address: provider.address,
    creator: provider.creator,
  };
}
