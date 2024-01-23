"use client";

import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";

export function StartButton({ courseId, lessonId }) {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push(`/course/${courseId}/lesson/${lessonId}`);
      }}
    >
      Start Course
    </Button>
  );
}
