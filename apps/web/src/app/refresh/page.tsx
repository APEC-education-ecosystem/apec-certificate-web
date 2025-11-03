"use client";

import { Suspense } from "react";
import RefreshContent from "./refresh-content";
import PageLoading from "@/components/page-loading";

export default function RefreshPage() {
  return (
    <Suspense fallback={<PageLoading />}>
      <RefreshContent />
    </Suspense>
  );
}
