import { usePrivy, type WalletWithMetadata } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";

export const useUserWallet = () => {
  const { user } = usePrivy();

  return useQuery({
    queryKey: ["user-wallet", user?.id],
    queryFn: async () => {
      const linkedAccount = user?.linkedAccounts.find(
        (acc) =>
          acc.type === "wallet" &&
          acc.walletClientType === "privy" &&
          acc.chainType === "solana"
      );

      return (linkedAccount as WalletWithMetadata) ?? null;
    },
    enabled: !!user,
  });
};
