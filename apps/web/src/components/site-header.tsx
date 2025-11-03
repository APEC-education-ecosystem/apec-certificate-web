"use client";
import { SidebarIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useUserWallet } from "@/hooks/use-user-wallet";
import UserProfile from "./user-profile";
import { ModeToggle } from "./mode-toggle";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const { data: account, isLoading } = useUserWallet();
  const pathname = usePathname();

  // Function to get page title based on route
  const getPageTitle = (path: string) => {
    switch (path) {
      case "/app/provider":
        return "Provider Management";
      case "/app/course":
        return "Course Management";
      case "/app/certificates":
        return "Certificate Management";
      default:
        // Handle dynamic routes or extract from path
        const segments = path.split("/").filter(Boolean);
        if (segments.length > 0) {
          // Capitalize first letter and replace hyphens with spaces
          return segments[segments.length - 1]
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        }
        return "Trang chủ";
    }
  };

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">APEC Learning</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{getPageTitle(pathname)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-2">
          <UserProfile />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
