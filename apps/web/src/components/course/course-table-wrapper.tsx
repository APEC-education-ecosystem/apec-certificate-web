import CourseTable from "@/components/course/course-table";
import { getMyCourses } from "@/server/course";

const CourseTableWrapper = async () => {
  const courses = await getMyCourses();
  return <CourseTable courses={courses} />;
};

export default CourseTableWrapper;
