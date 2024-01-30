"use client";

import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

interface Course {
  id: string;
  name: string;
  description: string;
  logo: string;
  image: string;
}

export function CreateCourseButton() {
  const router = useRouter();

  const { mutateAsync: createCourse } = api.learning.create.useMutation();

  const handleClick = async () => {
    const course = await createCourse({
      name: "New Course",
      description: "New Course",
      logo: "/course-placeholder.png",
      image: "/course-placeholder.png",
    });
    const id = course[0]?.id;

    if (id) router.push(`/admin/courses/create/${id}`);
  };
  return <Button onClick={handleClick}>Create Course</Button>;
}
