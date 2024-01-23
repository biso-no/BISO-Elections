import { api } from "~/trpc/server";
import { CreateCourseForm } from "../../_components/create-course";

export default async function CreateCoursePage({
  params,
}: {
  params: { id: string };
}) {
  const course = await api.learning.byId.query({ id: params.id });

  return (
    <div className="min-h-screen w-full">
      <CreateCourseForm course={course} />
    </div>
  );
}
