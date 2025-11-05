import type { NftMetadata } from "@/lib/types";
import { getCertificateByNftMint } from "@/server/certificate";
import type { NextRequest } from "next/server";
import React from "react";

type Props = {
  params: Promise<{
    mint: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: Props) {
  const { mint } = await params;

  // Normalize mint by removing .json extension if present
  const normalizedMint = mint.endsWith(".json") ? mint.slice(0, -5) : mint;

  try {
    const certRecord = await getCertificateByNftMint(normalizedMint);
    if (!certRecord) {
      return Response.json({ error: "Metadata not found" }, { status: 404 });
    }

    const metadata: NftMetadata = {
      name: certRecord.course.name,
      description: `This NFT certifies that ${certRecord.name} has successfully completed the course "${certRecord.course.name}" offered by ${certRecord.course.provider.fullName}.`,
      image: `${process.env.NEXT_PUBLIC_BASE_URL}/image/certificate/${certRecord.nftMint}`,
      external_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${certRecord.wallet}`,
      attributes: [
        {
          trait_type: "Issuer",
          value: certRecord.course.provider.fullName,
        },
        {
          trait_type: "Issuer Identifier",
          value: certRecord.course.provider.shortName.toUpperCase(),
        },
        {
          trait_type: "Course",
          value: certRecord.course.name,
        },
        {
          trait_type: "Course Identifier",
          value: certRecord.course.shortName.toUpperCase(),
        },
        {
          trait_type: "Recipient",
          value: certRecord.name.toUpperCase(),
        },
      ],
      properties: {
        files: [
          {
            uri: `${process.env.NEXT_PUBLIC_BASE_URL}/image/certificate/${certRecord.nftMint}`,
            type: "image/png",
          },
        ],
        category: "image",
      },
    };

    return Response.json(metadata);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch metadata" },
      { status: 500 }
    );
  }
}
