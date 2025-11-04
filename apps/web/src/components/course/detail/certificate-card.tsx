"use client";
import React, { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  ExternalLink,
  Check,
  Loader2,
  FingerprintIcon,
} from "lucide-react";
import CopyIconButton from "@/components/copy-icon-button";
import { getExplorerUrl } from "@/lib/network";
import { useApecProgram } from "@/hooks/use-apec-program";
import type { Certificate } from "@/lib/types";
import { format } from "date-fns";
import { getCourseImageProxyUrl } from "@/lib/utils";
import Image from "next/image";

type CertificateCardProps = {
  certificate: Certificate;
  showMintButton?: boolean;
};

const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  showMintButton = false,
}) => {
  const { claimCertificate } = useApecProgram();

  const { mutate, isPending } = claimCertificate(
    certificate.courseId,
    certificate.id,
    certificate.wallet
  );

  const courseImageUrl = useMemo(() => {
    return getCourseImageProxyUrl(certificate.courseId);
  }, [certificate.courseId]);

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-linear-to-br from-primary/5 via-background to-background p-5 transition-all hover:shadow-lg hover:border-primary/50 flex flex-col">
      {/* Certificate Icon/Badge */}
      <div className="absolute top-4 right-4 ">
        <div className="relative aspect-video overflow-hidden bg-muted h-20 border rounded">
          <Image
            src={courseImageUrl}
            alt={certificate.name}
            fill
            className="object-contain p-2"
          />
        </div>
      </div>

      {/* Certificate Content */}
      <div className="relative space-y-3 flex-1">
        {/* Certificate Name */}
        <div>
          <h3 className="font-semibold text-lg line-clamp-2 mb-1">
            {certificate.name}
          </h3>
          {certificate.course && (
            <Badge variant="secondary" className="text-xs">
              {certificate.course.shortName}
            </Badge>
          )}
        </div>

        {/* Issue Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            Issued on{" "}
            {certificate.created_at
              ? format(new Date(certificate.created_at), "MMMM d, yyyy")
              : "Unknown"}
          </span>
        </div>

        <Separator />

        {/* NFT & Transaction Details */}
        <div className="space-y-2">
          {certificate.nftMint ? (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                NFT Certificate
              </p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-xs truncate flex-1">
                  {certificate.nftMint}
                </p>
                <CopyIconButton content={certificate.nftMint} />
                <a
                  href={getExplorerUrl(certificate.nftMint, "address")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
              <span>NFT minting pending</span>
            </div>
          )}

          {certificate.txHash && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Transaction
              </p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-xs truncate flex-1">
                  {certificate.txHash}
                </p>
                <CopyIconButton content={certificate.txHash} />
                <a
                  href={getExplorerUrl(certificate.txHash, "tx")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Verification Badge */}
        {certificate.nftMint && (
          <div className="pt-2">
            <Badge
              variant="default"
              className="gap-1 bg-green-600 hover:bg-green-700"
            >
              <Check className="h-3 w-3" />
              Verified on Solana
            </Badge>
          </div>
        )}
      </div>

      {/* Mint Button - only shown when showMintButton is true */}
      {showMintButton && !certificate.nftMint && (
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-3"
          disabled={isPending}
          onClick={() => mutate()}
        >
          {isPending ? (
            <Loader2 className="size-4 mr-2 animate-spin" />
          ) : (
            <FingerprintIcon className="size-4 mr-2" />
          )}
          Mint Certificate
        </Button>
      )}
    </div>
  );
};

export default CertificateCard;
