import { createSolanaRpc, createSolanaRpcSubscriptions } from "@solana/kit";

export const chain = "solana:devnet";

export const rpc = createSolanaRpc(
  `https://${process.env.NEXT_PUBLIC_SOLANA_RPC}`
);
export const rpcSubscriptions = createSolanaRpcSubscriptions(
  `wss://${process.env.NEXT_PUBLIC_SOLANA_RPC}`
);

export const getExplorerUrl = (
  signature: string,
  txOrAccount: "tx" | "address" = "tx",
  baseUrl: string = "https://explorer.solana.com"
) => {
  const isDevnet = chain.includes("devnet");
  const clusterParam = isDevnet ? "?cluster=devnet" : "";
  return `${baseUrl}/${txOrAccount}/${signature}${clusterParam}`;
};
