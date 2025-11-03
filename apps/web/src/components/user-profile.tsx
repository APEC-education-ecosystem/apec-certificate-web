"use client";

import { CopyIcon, LogOutIcon } from "lucide-react";

import type { User } from "@privy-io/node";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { UserAvatar } from "./user-avatar";
import { revalidateApp } from "@/server/revalidate-data";
import { usePrivy } from "@privy-io/react-auth";
import { useUserWallet } from "@/hooks/use-user-wallet";
import { Skeleton } from "./ui/skeleton";
import LoginButton from "./login-button";
import { handleCopyText } from "@/lib/utils";
import { toast } from "sonner";

export default function UserProfile() {
  const { logout, authenticated } = usePrivy();
  const { data: account, isLoading } = useUserWallet();
  const router = useRouter();

  if (!authenticated || !account) {
    return <LoginButton />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {isLoading ? (
            <Skeleton className="size-8 rounded-full" />
          ) : (
            <UserAvatar label={account?.address || account?.id || ""} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          onClick={() => {
            handleCopyText(account.address);
            toast.success("Address copied to clipboard!");
          }}
        >
          <CopyIcon className="mr-2 h-4 w-4" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await logout();
            await revalidateApp("/");
            router.replace("/");
          }}
          className="text-red-500"
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
