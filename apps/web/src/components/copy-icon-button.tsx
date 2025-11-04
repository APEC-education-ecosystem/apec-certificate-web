"use client";
import { Button } from "./ui/button";
import { CopyIcon } from "lucide-react";
import { handleCopyText } from "@/lib/utils";
import { toast } from "sonner";

type Props = {
  content: string;
};
const CopyIconButton = ({ content }: Props) => {
  return (
    <Button
      onClick={() => {
        handleCopyText(content);
        toast.success("Copied to clipboard");
      }}
      size={"icon"}
      variant={"ghost"}
    >
      <CopyIcon className="h-4 w-4" />
    </Button>
  );
};

export default CopyIconButton;
