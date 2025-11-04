import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Wallet, User as UserIcon, Award } from "lucide-react";

export default function ProfileLoading() {
  return (
    <div className="container mx-auto py-10 space-y-6">
      {/* Header Card Skeleton */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar Skeleton */}
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-3">
                  {/* Name Skeleton */}
                  <Skeleton className="h-9 w-64" />
                  {/* Date Skeleton */}
                  <Skeleton className="h-5 w-56" />
                </div>
                {/* Badges Skeleton */}
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-32 rounded-full" />
                  <Skeleton className="h-6 w-28 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs Skeleton */}
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
            {/* Account Information Skeleton */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Account details and authentication status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i}>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-5 w-full mb-3" />
                      {i < 4 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Linked Accounts Skeleton */}
            <Card>
              <CardHeader>
                <CardTitle>Linked Accounts</CardTitle>
                <CardDescription>Email and wallet connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Section Skeleton */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <Skeleton className="h-5 w-64 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>

                {/* Wallets Section Skeleton */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Wallet className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="space-y-3">
                    {[1].map((i) => (
                      <div
                        key={i}
                        className="p-4 bg-muted rounded-lg space-y-3"
                      >
                        <div className="space-y-3">
                          {/* Badges */}
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-20 rounded-full" />
                            <Skeleton className="h-5 w-24 rounded-full" />
                          </div>
                          {/* Address */}
                          <Skeleton className="h-4 w-full" />
                        </div>
                        <Separator />
                        {/* Details */}
                        <div className="grid grid-cols-3 gap-3">
                          {[1, 2, 3].map((j) => (
                            <div key={j}>
                              <Skeleton className="h-3 w-16 mb-1" />
                              <Skeleton className="h-3 w-20" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Certificates</CardTitle>
              <CardDescription>Your earned certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 bg-muted rounded-lg space-y-3">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Separator />
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
