"use client";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";

const ApiHeathCheck = () => {
  const healthCheck = useQuery(trpc.healthCheck.queryOptions());
  return (
    <div className="flex items-center gap-2">
      <div
        className={`h-2 w-2 rounded-full animate-pulse ${
          healthCheck.data ? "bg-green-500" : "bg-red-500"
        }`}
      />
      <span className="text-sm text-muted-foreground">
        {healthCheck.isLoading
          ? "Checking..."
          : healthCheck.data
          ? "Connected"
          : "Disconnected"}
      </span>
    </div>
  );
};

export default ApiHeathCheck;
