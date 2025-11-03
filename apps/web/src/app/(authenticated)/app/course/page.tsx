import { Suspense } from "react";
import CourseTableWrapper from "@/components/course/course-table-wrapper";
import CourseTableLoading from "@/components/course/course-table-loading";
import { getMyCourses } from "@/server/course";
import { BookOpen, Users, Award } from "lucide-react";

const CourseManagementPage = async () => {
  // Get courses count for stats (could be optimized with a count query)
  const coursesPromise = getMyCourses();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Course Management Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create, manage and track your educational courses. Build engaging
            learning experiences and issue blockchain-verified certificates to
            your students.
          </p>
        </div>

        {/* Stats Section */}
        <Suspense
          fallback={
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm animate-pulse"
                >
                  <div className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full w-12 h-12 mx-auto mb-4" />
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto" />
                </div>
              ))}
            </div>
          }
        >
          <StatsSection coursesPromise={coursesPromise} />
        </Suspense>

        {/* Course Management Section */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm p-6">
            <Suspense fallback={<CourseTableLoading />}>
              <CourseTableWrapper />
            </Suspense>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Create engaging courses and issue blockchain-verified certificates
            to provide students with tamper-proof credentials that are globally
            recognized.
          </p>
        </div>
      </div>
    </div>
  );
};

const StatsSection = async ({
  coursesPromise,
}: {
  coursesPromise: ReturnType<typeof getMyCourses>;
}) => {
  const courses = await coursesPromise;

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-fit mx-auto mb-4">
          <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">
          {courses.length}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Total Courses
        </p>
      </div>

      <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full w-fit mx-auto mb-4">
          <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">
          0
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Total Students
        </p>
      </div>

      <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full w-fit mx-auto mb-4">
          <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
        </div>
        <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">
          0
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Certificates Issued
        </p>
      </div>
    </div>
  );
};

export default CourseManagementPage;
