"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/utils/trpc";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { createSolanaRpc, createSolanaRpcSubscriptions } from "@solana/kit";
import { useEffect } from "react";
import { rpc, rpcSubscriptions } from "@/lib/network";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <PrivyProvider
        config={{
          externalWallets: {
            walletConnect: { enabled: false },
            disableAllExternalWallets: true,
          },
          appearance: { walletChainType: "solana-only" },
          loginMethods: ["email", "google"],
          solana: {
            rpcs: {
              "solana:mainnet": {
                rpc: createSolanaRpc(`https://api.mainnet-beta.solana.com`),
                rpcSubscriptions: createSolanaRpcSubscriptions(
                  `wss://api.mainnet-beta.solana.com`
                ),
              },
              "solana:devnet": {
                rpc,
                rpcSubscriptions,
              },
            },
          },
        }}
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
        clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID!}
      >
        <QueryClientProvider client={queryClient}>
          <PrivyInitFlagBridge />
          {children}
          <ReactQueryDevtools />
        </QueryClientProvider>
        <Toaster richColors />
      </PrivyProvider>
    </ThemeProvider>
  );
}

function PrivyInitFlagBridge(): null {
  const { ready } = usePrivy();
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).__privyInitializing = !ready;
    }
  }, [ready]);
  return null;
}
