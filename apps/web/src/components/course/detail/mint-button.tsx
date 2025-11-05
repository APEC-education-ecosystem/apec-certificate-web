"use client";
import { Button } from "@/components/ui/button";
import { useApecProgram } from "@/hooks/use-apec-program";
import type { MyId } from "@/lib/types";
import { FingerprintIcon, Loader2 } from "lucide-react";
import React from "react";
type Props = {
  courseId: MyId;
  certificateId: number;
  wallet: string;
};
const MintButton: React.FC<Props> = ({ courseId, certificateId, wallet }) => {
  const { claimCertificate } = useApecProgram();

  const { mutate, isPending } = claimCertificate(
    courseId,
    certificateId,
    wallet
  );

  return (
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
  );
};

export default MintButton;
