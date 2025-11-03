"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BookOpen } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { FileUpload } from "../ui/file-upload";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { generateIdFromTimestamp } from "@/lib/utils";
import { useApecProgram } from "@/hooks/use-apec-program";

// Define the form schema with validation
const courseFormSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: "Course name must be at least 2 characters.",
    })
    .max(100, {
      message: "Course name must not exceed 100 characters.",
    }),
  shortName: z
    .string()
    .min(2, {
      message: "Short name must be at least 2 characters.",
    })
    .max(20, {
      message: "Short name must not exceed 20 characters.",
    }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(1000, {
      message: "Description must not exceed 1000 characters.",
    }),
  image: z
    .instanceof(File, {
      message: "Please select a valid image file.",
    })
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 5 * 1024 * 1024; // 5MB limit
      },
      {
        message: "File size must be less than 5MB.",
      }
    )
    .refine(
      (file) => {
        if (!file) return true;
        return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
      },
      {
        message: "Only JPEG, PNG and WebP images are allowed.",
      }
    ),
});

export type CourseFormValues = z.infer<typeof courseFormSchema>;

type Props = {
  courseId: number;
  onComplete?: () => void;
};
const CourseForm = ({ onComplete, courseId }: Props) => {
  const { createCourse } = useApecProgram();

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      fullName: "",
      shortName: "",
      description: "",
      image: undefined,
    },
  });

  async function handleSubmit(values: CourseFormValues) {
    try {
      const result = await createCourse.mutateAsync({
        id: courseId,
        fullName: values.fullName,
        shortName: values.shortName,
        description: values.description,
      });

      if (result?.success) {
        // Reset form on successful submission
        form.reset();
        onComplete?.();
        console.log("Course created successfully!", result.signature);
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  }

  return (
    <Card className="shadow-xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <BookOpen className="size-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
          Create New Course
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Create an engaging course and start issuing certificates
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                    Course Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Introduction to Blockchain Technology"
                      className="h-12 text-base border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/20"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 dark:text-gray-400">
                    The full name of your course.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                    Short Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="BLOCKCHAIN101"
                      className="h-12 text-base border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/20 uppercase"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 dark:text-gray-400">
                    A short identifier (max 20 characters) for your course.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your course content, learning objectives, and what students will achieve..."
                      rows={6}
                      className="text-base border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/20"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 dark:text-gray-400">
                    Detailed description of your course content and objectives.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                    Course Image
                  </FormLabel>
                  <FormControl>
                    <FileUpload
                      value={value}
                      onFileChange={onChange}
                      accept="image/*"
                      maxSize={5 * 1024 * 1024} // 5MB
                      placeholder="Upload course cover image"
                      description="PNG, JPG, WebP up to 5MB"
                      bucket={process.env.NEXT_PUBLIC_STORAGE_COURSE_BUCKET}
                      filePath={`image_${courseId}`}
                      autoUpload
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 dark:text-gray-400">
                    Upload a cover image for your course. Max size: 5MB.
                    Formats: JPEG, PNG, WebP.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                type="submit"
                disabled={createCourse.isPending || !form.formState.isValid}
                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {createCourse.isPending
                  ? "Creating Course..."
                  : "Create Course"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CourseForm;
