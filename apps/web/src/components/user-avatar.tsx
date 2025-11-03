import { getInitials } from "@/lib/get-initials";
import { getInitialsColor } from "@/lib/get-initials-colors";
import { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function UserAvatar({
  className,
  label,
  src,
}: {
  className?: string;
  label: string;
  src?: string;
}) {
  const initials = useMemo(() => getInitials(label), [label]);
  const { bg, text } = useMemo(() => getInitialsColor(initials), [initials]);
  return (
    <Avatar className={className}>
      {src ? <AvatarImage src={src} /> : null}
      <AvatarFallback
        className={`${bg} ${text}`}
        delayMs={src ? 600 : undefined}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
