import React from "react";
import { getUser } from "@/server/user-action";
import { getCertificatesByUser } from "@/server/certificate";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award } from "lucide-react";
import CertificateList from "@/components/course/detail/certificate-list";

const CertificateManagementPage = async () => {
  const { data } = await getUser();
  const user = data?.data;

  if (!data?.success || !user) {
    redirect("/");
  }

  // Get Solana wallet address
  const walletAccount = user.linked_accounts?.find(
    (account) =>
      account.type === "wallet" &&
      account.chain_type === "solana" &&
      account.wallet_client === "privy"
  );

  if (!walletAccount?.address) {
    return (
      <div className="container mx-auto py-6 md:py-10 px-4 md:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              My Certificates
            </CardTitle>
            <CardDescription>
              Manage and view all your earned certificates
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">
              Please connect a Solana wallet to view your certificates
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get all certificates (including pending ones)
  const certificates = await getCertificatesByUser(walletAccount.address, true);

  return (
    <div className="container mx-auto py-6 md:py-10 px-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">My Certificates</h1>
        <p className="text-muted-foreground">
          Manage and view all your earned certificates
        </p>
      </div>

      {certificates.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Award className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-1">No Certificates Yet</p>
            <p className="text-muted-foreground text-sm">
              Complete courses to earn your first certificate
            </p>
          </CardContent>
        </Card>
      ) : (
        <CertificateList certificates={certificates} />
      )}
    </div>
  );
};

export default CertificateManagementPage;
