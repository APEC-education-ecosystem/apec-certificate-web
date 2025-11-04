"use client";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink, Hash, Calendar } from "lucide-react";
import { getExplorerUrl } from "@/lib/network";
import { format } from "date-fns";
import UpdateCertificateButton from "./update-certificate-button";
import { getCourseById } from "@/server/course";

type CourseHeaderProps = {
  course: Awaited<ReturnType<typeof getCourseById>>;
};

const CourseHeader: React.FC<CourseHeaderProps> = ({ course }) => {
  if (!course) {
    return <div>Course not found</div>;
  }
  return (
    <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6 p-6">
        {/* Course Image */}
        <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-muted">
          {course.image ? (
            <Image
              src={course.image}
              alt={course.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-linear-to-br from-blue-500 via-purple-500 to-pink-500">
              <BookOpen className="size-24 text-white opacity-80" />
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Badge className="text-xs text-white">{course.shortName}</Badge>
              <Badge
                variant="outline"
                className="text-xs bg-green-500 text-white border-0"
              >
                Blockchain Verified
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {course.name}
            </h1>
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {course.description || "No description available"}
          </p>

          <div className="space-y-3 pt-4">
            {/* Creator */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span className="font-medium">Creator:</span>
              <span className="font-mono">
                {course.creator.slice(0, 8)}...{course.creator.slice(-8)}
              </span>
            </div>

            {/* Created Date */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">Created:</span>
              <span>
                {format(new Date(course.created_at), "yyyy-MM-dd HH:mm:ss")}
              </span>
            </div>

            {/* Transaction Hash */}
            {course.txHash && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Hash className="h-4 w-4" />
                <span className="font-medium">Transaction:</span>
                <a
                  href={getExplorerUrl(course.txHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono hover:text-primary transition-colors flex items-center gap-1"
                >
                  {course.txHash.slice(0, 8)}...{course.txHash.slice(-8)}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}

            {course.certificates.length === 0 ? (
              <UpdateCertificateButton
                courseId={course.id}
                creatorWallet={course.creator}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
