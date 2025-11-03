"use client";
import { chain, rpc, rpcSubscriptions } from "@/lib/network";
import { usePrivy } from "@privy-io/react-auth";
import { useWallets } from "@privy-io/react-auth/solana";
import type {
  createSolanaRpc,
  createSolanaRpcSubscriptions,
} from "@solana/kit";
import React, { type PropsWithChildren } from "react";
import PageLoading from "./page-loading";

interface SolanaContextState {
  rpc: ReturnType<typeof createSolanaRpc>;
  rpcSubscriptions: ReturnType<typeof createSolanaRpcSubscriptions>;
  chain: typeof chain;
  wallet: ReturnType<typeof useWallets>["wallets"][0];
}
const SolanaContext = React.createContext<SolanaContextState | undefined>(
  undefined
);

const SolanaProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { ready: privyReady } = usePrivy();
  const { ready: walletsReady, wallets } = useWallets();

  const isReady = privyReady && walletsReady;
  if (!isReady) {
    return <PageLoading />;
  }
  return (
    <SolanaContext.Provider
      value={{
        rpc,
        rpcSubscriptions,
        chain,
        wallet: wallets[0],
      }}
    >
      {children}
    </SolanaContext.Provider>
  );
};

export default SolanaProvider;

export const useSolana = (): SolanaContextState => {
  const context = React.useContext(SolanaContext);
  if (!context) {
    throw new Error("useSolana must be used within a SolanaProvider");
  }
  return context;
};
