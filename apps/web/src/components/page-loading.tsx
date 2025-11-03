"use client";
import { AwardIcon, FileBadgeIcon } from "lucide-react";

export default function PageLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="rounded-full p-5 bg-muted">
          <FileBadgeIcon className="size-20 stroke-indigo-500" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">APEC Learning</span>
        </div>

        {/* Loading spinner */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">Loading...</p>
            <div className="h-1 w-48 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{
                  width: "35%",
                  animation: "loading 2s ease-in-out infinite",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs text-muted-foreground animate-pulse">
            Please wait while we load the content.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(200%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
