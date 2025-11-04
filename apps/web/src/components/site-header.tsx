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
import React from "react";
import Link from "next/link";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();

  // Memoize segments to avoid recalculation
  const segments = React.useMemo(
    () => pathname.split("/").filter(Boolean),
    [pathname]
  );

  // Route configuration map for better maintainability
  const routeConfig: Record<string, { title: string; parent?: string }> = {
    "/app/provider": { title: "Provider Management" },
    "/app/course": { title: "Course Management" },
    "/app/certificates": { title: "Certificate Management" },
  };

  // Function to get page title based on route
  const getPageTitle = React.useCallback(() => {
    // Check exact match first
    if (routeConfig[pathname]) {
      return routeConfig[pathname].title;
    }

    // Handle dynamic routes
    if (segments.length > 0) {
      return segments[segments.length - 1]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return "Trang chủ";
  }, [pathname, segments]);

  const getBreadcrumbItems = React.useCallback(() => {
    const title = getPageTitle();

    // Only handle nested app routes
    if (segments[0] === "app" && segments.length > 2) {
      const section = segments[1];

      // Map sections to their base routes
      const sectionRoutes: Record<string, { title: string; href: string }> = {
        course: { title: "Course", href: "/app/course" },
        certificates: { title: "Certificates", href: "/app/certificates" },
        profile: { title: "Profile", href: "/app/profile" },
      };

      if (sectionRoutes[section]) {
        return [sectionRoutes[section], { title, href: pathname }];
      }
    }

    return [{ title, href: pathname }];
  }, [pathname, segments, getPageTitle]);

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
              <BreadcrumbLink href="/">APEC Learning</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {getBreadcrumbItems().map((item, index) => (
              <React.Fragment key={index}>
                {index < getBreadcrumbItems().length - 1 ? (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href={{ pathname: item.href }}>{item.title}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </React.Fragment>
            ))}
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
