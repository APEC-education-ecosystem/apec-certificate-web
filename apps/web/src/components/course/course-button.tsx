"use client";
import React, { useMemo } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import CourseForm from "./course-form";
import { generateIdFromTimestamp } from "@/lib/utils";

type Props = {
  trigger: React.ReactNode;
};

const CourseButton: React.FC<Props> = ({ trigger }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <CourseForm onComplete={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CourseButton;
