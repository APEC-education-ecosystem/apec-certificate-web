"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Wallet } from "lucide-react";

type WalletAddressDisplayProps = {
  address: string;
};

export function WalletAddressDisplay({ address }: WalletAddressDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Truncate address for mobile: show first 6 and last 4 characters
  const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="flex items-center gap-2 text-muted-foreground group max-w-full">
      <Wallet className="h-4 w-4 shrink-0" />
      <code className="text-xs sm:text-sm bg-muted px-2 sm:px-3 py-1 rounded-md font-mono overflow-hidden">
        {/* Show truncated on mobile, full on desktop */}
        <span className="inline sm:hidden">{truncatedAddress}</span>
        <span className="hidden sm:inline break-all">{address}</span>
      </code>
      <button
        className="p-1.5 hover:bg-muted rounded-md transition-colors shrink-0"
        onClick={handleCopy}
        title="Copy wallet address"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity" />
        )}
      </button>
    </div>
  );
}
