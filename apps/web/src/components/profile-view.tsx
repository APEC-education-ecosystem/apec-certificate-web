import { UserAvatar } from "@/components/user-avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Wallet,
  Check,
  X,
  Shield,
  User as UserIcon,
  Award,
} from "lucide-react";
import CopyIconButton from "@/components/copy-icon-button";
import type { User } from "@privy-io/node";
import { UserCertificates } from "@/components/user-certificates";
import { format } from "date-fns";

type ProfileViewProps = {
  user: User;
};

export function ProfileView({ user }: ProfileViewProps) {
  // Extract information
  const emailAccount = user.linked_accounts?.find(
    (account) => account.type === "email"
  );
  const walletAccounts = user.linked_accounts?.filter(
    (account) =>
      account.type === "wallet" &&
      account.chain_type === "solana" &&
      account.wallet_client === "privy"
  );
  const createdDate = format(
    new Date(user.created_at * 1000),
    "MMMM d, yyyy 'at' h:mm a"
  );

  // Get display name and wallet address
  const displayName =
    emailAccount?.address || walletAccounts?.[0]?.address || "User";
  const solanaWalletAddress = walletAccounts?.[0]?.address;

  return (
    <div className="container mx-auto py-6 md:py-10 px-4 md:px-6 space-y-6">
      {/* Header Card - Full Width */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center md:items-center gap-6">
            <UserAvatar
              label={displayName}
              className="h-20 w-20 md:h-24 md:w-24 text-2xl md:text-3xl"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-2xl md:text-3xl mb-2 wrap-break-word">
                    {displayName}
                  </CardTitle>
                  <CardDescription className="text-base">
                    Member since {createdDate}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  {user.has_accepted_terms && (
                    <Badge variant="outline" className="gap-1">
                      <Check className="h-3 w-3" />
                      Terms Accepted
                    </Badge>
                  )}
                  {user.mfa_methods && user.mfa_methods.length > 0 && (
                    <Badge variant="outline" className="gap-1">
                      <Shield className="h-3 w-3" />
                      MFA Enabled
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs for Profile and Certificates */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile" className="gap-2">
            <UserIcon className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="certificates" className="gap-2">
            <Award className="h-4 w-4" />
            Certificates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Account details and authentication status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      User ID
                    </p>
                    <p className="text-sm font-mono break-all">{user.id}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Account Type
                    </p>
                    <p className="text-sm">
                      {user.is_guest ? "Guest Account" : "Full Account"}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Terms Accepted
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      {user.has_accepted_terms ? (
                        <>
                          <Check className="h-4 w-4 text-green-600" />
                          Yes
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4 text-red-600" />
                          No
                        </>
                      )}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      MFA Methods
                    </p>
                    <p className="text-sm">
                      {user.mfa_methods && user.mfa_methods.length > 0
                        ? `${user.mfa_methods.length} method(s) enabled`
                        : "Not enabled"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact & Wallets */}
            <Card>
              <CardHeader>
                <CardTitle>Linked Accounts</CardTitle>
                <CardDescription>Email and wallet connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Section */}
                {emailAccount && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Mail className="h-4 w-4" />
                      Email
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate text-sm md:text-base break-all">
                            {emailAccount.address}
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Verified at:{" "}
                            {emailAccount.verified_at
                              ? format(
                                  new Date(emailAccount.verified_at * 1000),
                                  "MMM d, yyyy 'at' h:mm a"
                                )
                              : "Not verified"}
                          </p>
                        </div>
                        {emailAccount.verified_at && (
                          <Badge variant="default" className="gap-1 shrink-0">
                            <Check className="h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Wallets Section */}
                {walletAccounts && walletAccounts.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Wallet className="h-4 w-4" />
                      Wallets ({walletAccounts.length})
                    </div>
                    <div className="space-y-3">
                      {walletAccounts.map((wallet, index) => (
                        <div
                          key={wallet.address || index}
                          className="p-4 bg-muted rounded-lg space-y-3"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="capitalize">
                                {wallet.chain_type}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {wallet.connector_type}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-3">
                              <p className="font-mono text-sm break-all flex-1">
                                {wallet.address}
                              </p>
                              <CopyIconButton content={wallet.address} />
                            </div>
                          </div>
                          <Separator />
                          <div className="grid grid-cols-3 gap-3 text-sm">
                            <div>
                              <p className="text-muted-foreground text-xs mb-1">
                                Client
                              </p>
                              <p className="font-medium capitalize text-xs">
                                {wallet.wallet_client}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs mb-1">
                                Recovery
                              </p>
                              <p className="font-medium text-xs">
                                {wallet.recovery_method}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs mb-1">
                                Verified
                              </p>
                              <p className="font-medium text-xs">
                                {wallet.verified_at
                                  ? format(
                                      new Date(wallet.verified_at * 1000),
                                      "MMM d, yyyy"
                                    )
                                  : "Not verified"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="mt-6">
          {solanaWalletAddress ? (
            <UserCertificates walletAddress={solanaWalletAddress} />
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-10">
                <p className="text-muted-foreground">
                  No Solana wallet connected
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
