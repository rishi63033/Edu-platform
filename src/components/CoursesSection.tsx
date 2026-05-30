import { getCourses } from "@/lib/supabase";
import CourseCard from "./CourseCard";
import { CourseListWrapper } from "./CourseListWrapper";

export default async function CoursesSection() {
  const { data: courses, error } = await getCourses();

  if (error) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl border border-red-900/40 bg-red-950/20 p-6 text-center">
        <p className="text-red-400 text-sm font-medium">
          Could not load courses — {error}
        </p>
        <p className="text-slate-500 text-xs mt-1">
          Check your Supabase environment variables and try again.
        </p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl border border-[#1e2a3a] bg-[#0f1420] p-6 text-center">
        <p className="text-slate-500 text-sm">No courses found. Seed your Supabase table.</p>
      </div>
    );
  }

  return (
    <CourseListWrapper>
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </CourseListWrapper>
  );
}
