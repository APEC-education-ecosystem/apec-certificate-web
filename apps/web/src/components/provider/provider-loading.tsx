import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2 } from "lucide-react";

const ProviderLoading = () => {
  return (
    <div className="space-y-6">
      {/* Header Card Loading */}
      <Card className="border-2 border-primary/20 bg-linear-to-r from-primary/5 to-primary/10">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building2 className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <div className="flex-1 space-y-2">
              <Skeleton className="h-8 w-64" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-start gap-2">
            <Skeleton className="w-4 h-4 mt-1 shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Card Loading */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="h-6 w-32" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Provider ID Loading */}
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700" />

          {/* Creator Address Loading */}
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-72" />
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700" />

          {/* Country Loading */}
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700" />

          {/* Address Loading */}
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Card Loading */}
      <Card className="border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-2">
            <Skeleton className="w-2 h-2 rounded-full" />
            <Skeleton className="h-4 w-64" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderLoading;
