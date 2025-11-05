import { UserCertificates } from "@/components/user-certificates";
import type { Metadata, ResolvingMetadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Award, Calendar, Check } from "lucide-react";
import { getCertificatesByUser } from "@/server/certificate";
import { WalletAddressDisplay } from "@/components/wallet-address-display";
import { BrandBanner } from "@/components/brand-banner";

type RouteParams = {
  params: Promise<{
    wallet: string;
  }>;
};

export async function generateMetadata(
  { params }: RouteParams,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { wallet } = await params;

  return {
    title: `Profile - ${wallet}`,
    description: `This profile showcases the certificates earned by the user with wallet address ${wallet}.`,
  };
}

export default async function WalletProfilePage({ params }: RouteParams) {
  const { wallet } = await params;
  const certificates = await getCertificatesByUser(wallet);

  const stats = {
    totalCertificates: certificates.length,
    mintedCertificates: certificates.filter((c) => c.nftMint).length,
    latestCertificate: certificates[0]?.created_at || null,
  };

  return (
    <div className="container mx-auto py-4 md:py-8 px-4 space-y-6 md:space-y-8">
      {/* Brand Banner */}
      <BrandBanner />

      {/* Profile Header */}
      <div className="relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-primary/5 to-background rounded-t-xl h-24 md:h-32" />

        <Card className="relative border-0 shadow-lg">
          <CardContent className="md:pt-8 pb-6 md:pb-8 px-4 md:px-6">
            {/* Avatar/Icon */}
            <div className="absolute -top-12 md:-top-16 left-4 md:left-8">
              <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-linear-to-br from-primary to-primary/60 flex items-center justify-center ring-4 ring-background shadow-xl">
                <Wallet className="h-12 w-12 md:h-16 md:w-16 text-primary-foreground" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="ml-0 md:ml-48 space-y-4">
              <div className="pt-16 md:pt-0">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  User Profile
                </h1>
                <WalletAddressDisplay address={wallet} />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pt-4">
                <div className="flex items-center gap-3 p-3 md:p-4 rounded-lg bg-muted/50">
                  <div className="p-2 rounded-full bg-primary/10 shrink-0">
                    <Award className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl md:text-2xl font-bold">
                      {stats.totalCertificates}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">
                      Total Certificates
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 md:p-4 rounded-lg bg-muted/50">
                  <div className="p-2 rounded-full bg-green-500/10 shrink-0">
                    <Check className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl md:text-2xl font-bold">
                      {stats.mintedCertificates}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">
                      Minted NFTs
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 md:p-4 rounded-lg bg-muted/50 sm:col-span-2 md:col-span-1">
                  <div className="p-2 rounded-full bg-blue-500/10 shrink-0">
                    <Calendar className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl md:text-2xl font-bold">
                      {stats.latestCertificate
                        ? new Date(stats.latestCertificate).toLocaleDateString(
                            "en-US",
                            { month: "short", year: "numeric" }
                          )
                        : "N/A"}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">
                      Latest Certificate
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certificates Section */}
      <UserCertificates walletAddress={wallet} />
    </div>
  );
}
