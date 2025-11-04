import { BookOpen, Users, Award } from "lucide-react";
import { getStatisticsCourseByCreator } from "@/server/course";

export const CourseStatsSection = async () => {
  const stats = await getStatisticsCourseByCreator();

  const statsConfig = [
    {
      icon: BookOpen,
      value: stats.totalCourses,
      label: "Total Courses",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Users,
      value: stats.totalCertificates,
      label: "Total Certificates",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Award,
      value: stats.totalMintedCertificates,
      label: "Certificates Minted",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {statsConfig.map((stat, index) => (
        <div
          key={index}
          className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
        >
          <div
            className={`p-3 ${stat.bgColor} rounded-full w-fit mx-auto mb-4`}
          >
            <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
          </div>
          <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">
            {stat.value}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};
