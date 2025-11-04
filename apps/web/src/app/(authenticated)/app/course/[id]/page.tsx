import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCourseById } from "@/server/course";
import CourseHeader from "@/components/course/detail/course-header";
import CourseStats from "@/components/course/detail/course-stats";
import CertificateList from "@/components/course/detail/certificate-list";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  params: Promise<{ id: string }>;
};

const CourseDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  const certificates = course.certificates;

  const mintedCount = certificates.filter((c) => c.nftMint !== null).length;
  const pendingCount = certificates.filter((c) => c.nftMint === null).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Part 1: Course Header */}
          <Suspense fallback={<CourseHeaderSkeleton />}>
            <CourseHeader course={course} />
          </Suspense>

          {/* Part 2: Course Statistics */}
          <Suspense fallback={<CourseStatsSkeleton />}>
            <CourseStats
              totalCertificates={certificates.length}
              mintedCertificates={mintedCount}
              pendingCertificates={pendingCount}
            />
          </Suspense>

          {/* Part 3: Certificate List */}
          <Suspense fallback={<CertificateListSkeleton />}>
            <CertificateList certificates={certificates} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

// Skeleton Components
const CourseHeaderSkeleton = () => (
  <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm p-6">
    <div className="grid md:grid-cols-2 gap-6">
      <Skeleton className="aspect-video w-full rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    </div>
  </div>
);

const CourseStatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[...Array(3)].map((_, i) => (
      <Skeleton key={i} className="h-24 rounded-xl" />
    ))}
  </div>
);

const CertificateListSkeleton = () => (
  <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm p-6">
    <Skeleton className="h-64 w-full" />
  </div>
);

export default CourseDetailPage;
