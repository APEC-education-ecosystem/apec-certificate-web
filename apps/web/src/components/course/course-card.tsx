"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BookOpen, ExternalLink, Hash } from "lucide-react";
import { getMyCourses } from "@/server/course";
import { getExplorerUrl } from "@/lib/network";

type CourseCardProps = {
  course: Awaited<ReturnType<typeof getMyCourses>>[0];
};

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm overflow-hidden p-0">
      <CardHeader className="pb-3 p-0">
        {/* Course Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {course.image ? (
            <Image
              src={course.image}
              alt={course.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-linear-to-br from-blue-500 via-purple-500 to-pink-500">
              <BookOpen className="size-16 text-white opacity-80" />
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badge Overlay */}
          <div className="absolute top-3 right-3 z-10">
            <Badge
              variant="secondary"
              className="text-[10px] sm:text-xs px-2 py-1 font-medium shadow-lg backdrop-blur-sm bg-white/90 dark:bg-gray-800/90"
            >
              {course.shortName}
            </Badge>
          </div>
        </div>
        {/* Course Info */}
        <div className="p-6 space-y-3">
          <CardTitle
            className="line-clamp-2 text-base sm:text-lg font-semibold leading-tight group-hover:text-primary transition-colors min-h-10 sm:min-h-12"
            title={course.name}
          >
            {course.name}
          </CardTitle>
          <CardDescription
            className="line-clamp-2 text-xs sm:text-sm leading-relaxed min-h-8 sm:min-h-10"
            title={course.description || "No description"}
          >
            {course.description || "No description available"}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-4 space-y-3">
        {/* Transaction Hash Link */}
        {course.txHash ? (
          <a
            href={getExplorerUrl(course.txHash)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground hover:text-primary transition-colors group/link"
          >
            <Hash className="h-3.5 w-3.5 shrink-0" />
            <span>Transaction:</span>
            <span className="truncate font-mono">
              {course.txHash.slice(0, 8)}...
              {course.txHash.slice(-8)}
            </span>
            <ExternalLink className="h-3 w-3 shrink-0 opacity-0 group-hover/link:opacity-100 transition-opacity" />
          </a>
        ) : null}

        {/* Stats or Additional Info */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground pt-2 border-t">
          <span>On-chain Course</span>
          <span className="font-medium text-primary">Blockchain Verified</span>
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0 flex gap-2">
        <Link href={`/app/course/${course.id}` as any} className="flex-1">
          <Button
            variant="default"
            className="w-full group-hover:shadow-lg transition-all"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
