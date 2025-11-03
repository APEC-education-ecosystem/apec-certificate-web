"use client";
import React from "react";
import CourseButton from "./course-button";
import CourseCard from "./course-card";
import { Button } from "../ui/button";
import { getMyCourses } from "@/server/course";
import { BookOpen, PlusCircleIcon } from "lucide-react";

type Props = {
  courses: Awaited<ReturnType<typeof getMyCourses>>;
};

const CourseTable: React.FC<Props> = ({ courses }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">My Courses</h2>
          <p className="text-muted-foreground text-sm">
            {courses.length} course{courses.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <CourseButton
          trigger={
            <Button>
              <PlusCircleIcon className="mr-2 size-4" />
              Create Course
            </Button>
          }
        />
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No courses yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first course to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseTable;
