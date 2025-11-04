"use server";

import { getDbCertificateByUser } from "@apec-learning/db";

export const getCertificatesByUser = async (
  walletAddress: string,
  all: boolean = false
) => {
  return getDbCertificateByUser(walletAddress, all);
};
