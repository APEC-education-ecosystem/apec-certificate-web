"use client";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import CourseForm from "./course-form";
import { generateIdFromTimestamp } from "@/lib/utils";

type Props = {
  trigger: React.ReactNode;
  id?: string;
};

const CourseButton: React.FC<Props> = ({ trigger, id }) => {
  const [open, setOpen] = React.useState(false);
  // Generate unique ID based on current timestamp
  const courseId = generateIdFromTimestamp();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <CourseForm onComplete={() => setOpen(false)} courseId={courseId} />
      </DialogContent>
    </Dialog>
  );
};

export default CourseButton;
