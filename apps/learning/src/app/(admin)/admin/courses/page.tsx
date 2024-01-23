import { api } from "~/trpc/server";
import { Courses } from "./_components/Courses";
import { CreateCourseButton } from "./_components/create-course-button";

export default async function Page() {
  const courses = await api.learning.all.query();

  if (!courses) {
    return null;
  }

  return (
    <div>
      <CreateCourseButton />
      <Courses courses={courses} />
    </div>
  );
}
