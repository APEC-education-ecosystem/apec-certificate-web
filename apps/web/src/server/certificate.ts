"use server";

import {
  getDbCertificateByNftMint,
  getDbCertificateByUser,
} from "@apec-learning/db";

export const getCertificatesByUser = async (
  walletAddress: string,
  all: boolean = false
) => {
  return getDbCertificateByUser(walletAddress, all);
};

export const getCertificateByNftMint = async (nftMint: string) => {
  return getDbCertificateByNftMint(nftMint);
};
