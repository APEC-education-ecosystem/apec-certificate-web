import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { getProviderByCreator } from "@/server/provider";
import {
  Building2,
  MapPin,
  Globe,
  FileText,
  Calendar,
  User,
  Hash,
} from "lucide-react";

interface Provider {
  id: string;
  fullName: string;
  shortName: string;
  description: string | null;
  country: string | null;
  address: string | null;
  creator: string;
}

interface ProviderInfoProps {
  provider: Awaited<ReturnType<typeof getProviderByCreator>>;
}

const ProviderInfo = ({ provider }: ProviderInfoProps) => {
  if (!provider) return null;
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-2 border-primary/20 bg-linear-to-r from-primary/5 to-primary/10">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                {provider.fullName}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="font-mono">
                  {provider.shortName}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Verified Provider
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        {provider.description && (
          <CardContent className="pt-0">
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-gray-500 mt-1 shrink-0" />
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {provider.description}
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Hash className="w-5 h-5" />
            Provider Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Provider ID */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <Hash className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Provider ID
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                {provider.id}
              </p>
            </div>
          </div>

          <Separator />

          {/* Creator Address */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Creator Wallet
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-mono break-all">
                {provider.creator}
              </p>
            </div>
          </div>

          {provider.country && (
            <>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Country
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {provider.country}
                  </p>
                </div>
              </div>
            </>
          )}

          {provider.address && (
            <>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Address
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {provider.address}
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Status Card */}
      <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm font-medium text-green-700 dark:text-green-300">
              Active Provider - Ready to issue certificates
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderInfo;
