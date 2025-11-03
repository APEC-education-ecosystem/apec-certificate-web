import { toast } from "sonner";
import { getExplorerUrl } from "@/lib/network";

interface TransactionToastOptions {
  signature?: string;
  successMessage?: string;
  errorMessage?: string;
}

export const useTransactionToast = () => {
  const showSuccess = (options: TransactionToastOptions) => {
    const {
      signature,
      successMessage = "Transaction completed successfully!",
    } = options;

    toast.success(successMessage, {
      description: signature
        ? `Transaction: ${signature.slice(0, 8)}...${signature.slice(-8)}`
        : undefined,
      action: signature
        ? {
            label: "View Explorer",
            onClick: () => {
              window.open(getExplorerUrl(signature), "_blank");
            },
          }
        : undefined,
      duration: 8000, // Show longer for success with action button
    });
  };

  const showError = (options: TransactionToastOptions) => {
    const { errorMessage = "Transaction failed. Please try again." } = options;

    toast.error(errorMessage, {
      duration: 6000,
    });
  };

  const showLoading = (message: string = "Processing transaction...") => {
    return toast.loading(message, {
      duration: Infinity, // Keep loading until dismissed
    });
  };

  const hideToast = (toastId: number | string) => {
    toast.dismiss(toastId);
  };

  return {
    showSuccess,
    showError,
    showLoading,
    hideToast,
  };
};
