"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User,
  ExternalLink,
  Hash,
  CheckCircle,
  Clock,
  Loader2,
  FingerprintIcon,
  FileBoxIcon,
} from "lucide-react";
import { getExplorerUrl } from "@/lib/network";
import { useApecProgram } from "@/hooks/use-apec-program";

type CertificateCardProps = {
  courseId: string;
  certificate: {
    id: number;
    name: string;
    wallet: string;
    nftMint: string | null;
    txHash: string | null;
    created_at: Date;
  };
};

const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  courseId,
}) => {
  const { claimCertificate } = useApecProgram();
  const { mutate, isPending } = claimCertificate(
    Number(courseId),
    certificate.id,
    certificate.wallet
  );
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle
              className="text-lg font-semibold line-clamp-1"
              title={certificate.name}
            >
              {certificate.name}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              ID: #{certificate.id}
            </p>
          </div>
          <Badge
            variant={certificate.nftMint ? "default" : "secondary"}
            className="shrink-0"
          >
            {certificate.nftMint ? (
              <CheckCircle className="h-3 w-3 mr-1" />
            ) : (
              <Clock className="h-3 w-3 mr-1" />
            )}
            {certificate.nftMint ? "Minted" : "Pending"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Wallet */}
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground shrink-0" />
          <a
            href={getExplorerUrl(certificate.wallet, "address")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs hover:text-primary transition-colors truncate flex items-center gap-1"
          >
            {certificate.wallet.slice(0, 8)}...{certificate.wallet.slice(-8)}
            <ExternalLink className="h-3 w-3 shrink-0" />
          </a>
        </div>

        {/* NFT Mint */}
        {certificate.nftMint && (
          <div className="flex items-center gap-2 text-sm">
            <FileBoxIcon className="h-4 w-4 text-muted-foreground shrink-0" />
            <a
              href={getExplorerUrl(certificate.nftMint, "address")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs hover:text-primary transition-colors truncate flex items-center gap-1"
            >
              {certificate.nftMint.slice(0, 8)}...
              {certificate.nftMint.slice(-8)}
              <ExternalLink className="h-3 w-3 shrink-0" />
            </a>
          </div>
        )}

        {/* Transaction Hash */}
        {certificate.txHash && (
          <div className="flex items-center gap-2 text-sm">
            <Hash className="h-4 w-4 text-muted-foreground shrink-0" />
            <a
              href={getExplorerUrl(certificate.txHash)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs hover:text-primary transition-colors truncate flex items-center gap-1"
            >
              TX: {certificate.txHash.slice(0, 6)}...
              {certificate.txHash.slice(-6)}
              <ExternalLink className="h-3 w-3 shrink-0" />
            </a>
          </div>
        )}

        {/* Created Date */}
        <div className="text-xs text-muted-foreground pt-2 border-t">
          Created: {new Date(certificate.created_at).toLocaleString()}
        </div>

        {/* Action Button */}
        {!certificate.nftMint && (
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2"
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
      </CardContent>
    </Card>
  );
};

export default CertificateCard;
