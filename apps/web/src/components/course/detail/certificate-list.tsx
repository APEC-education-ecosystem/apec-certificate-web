"use client";
import React, { useState } from "react";
import CertificateCard from "./certificate-card";
import { Button } from "@/components/ui/button";
import type { Certificate } from "@/lib/types";

type CertificateListProps = {
  certificates: Certificate[];
};

type FilterType = "all" | "minted" | "pending";

const CertificateList: React.FC<CertificateListProps> = ({ certificates }) => {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredCertificates = certificates.filter((cert) => {
    if (filter === "all") return true;
    if (filter === "minted") return cert.nftMint !== null;
    if (filter === "pending") return cert.nftMint === null;
    return true;
  });

  const mintedCount = certificates.filter((c) => c.nftMint !== null).length;
  const pendingCount = certificates.filter((c) => c.nftMint === null).length;

  return (
    <div className="space-y-6">
      <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Certificates
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredCertificates.length} certificate
              {filteredCertificates.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All ({certificates.length})
            </Button>
            <Button
              variant={filter === "minted" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("minted")}
            >
              Minted ({mintedCount})
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("pending")}
            >
              Pending ({pendingCount})
            </Button>
          </div>
        </div>

        <CertificateGrid certificates={filteredCertificates} />
      </div>
    </div>
  );
};

const CertificateGrid: React.FC<{
  certificates: Certificate[];
}> = ({ certificates }) => {
  if (certificates.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No certificates found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {certificates.map((certificate) => (
        <CertificateCard
          key={certificate.id}
          certificate={certificate}
          showMintButton={true}
        />
      ))}
    </div>
  );
};

export default CertificateList;
