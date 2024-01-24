"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MoreVertical } from "lucide-react";

import type { RouterOutputs } from "@acme/api";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

export function Courses(props: { courses: RouterOutputs["learning"]["all"] }) {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      {" "}
      {/* Center the content horizontally */}
      <div className="flex w-full max-w-7xl flex-col gap-10 p-6">
        {" "}
        {/* Set a max width */}
        <section className="w-full">
          <h2 className="mb-4 text-2xl font-bold">Courses</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {" "}
            {props.courses.map((course) => (
              <Card
                key={course.id}
                className="min-w- shadow-lg transition-shadow duration-200 ease-in-out hover:shadow-xl"
              >
                {" "}
                {/* Add shadow and hover effect */}
                <CardContent>
                  {course.image ? (
                    <Image
                      src={course.image}
                      alt={course.name}
                      width={600}
                      height={400}
                      className="rounded-md"
                    />
                  ) : (
                    <div className="aspect-[16/9] w-full bg-gray-200" />
                  )}
                  {/* Add a background color for the aspect ratio placeholder */}
                  <h3 className="mt-4 text-lg font-semibold">{course.name}</h3>

                  {/* Container for progress bar and percentage */}

                  <div className="flex flex-row justify-end gap-2">
                    <DeletePopover id={course.id} />
                    <Button
                      variant="outline"
                      className="mt-4 rounded-full px-4 py-2 text-sm font-medium transition-colors"
                      onClick={() =>
                        router.push(`/admin/courses/create/${course.id}`)
                      }
                    >
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function DeletePopover(props: { id: string }) {
  const utils = api.useUtils();

  const toast = useToast();

  const { mutateAsync: deleteCourse } = api.learning.delete.useMutation({
    onSuccess: async () => {
      await utils.learning.all.invalidate(undefined, { refetchType: "all" });
    },
    onError: (err) => {
      toast.toast({
        title:
          err?.data?.code === "UNAUTHORIZED"
            ? "You must be logged in to post"
            : "Failed to create post",
        description: "Please try again later",
        variant: "destructive",
      });
    },
  });

  const router = useRouter();

  const handleDeleteCourse = async () => {
    await deleteCourse({ id: props.id });
    router.push("/admin/courses");
  };

  return (
    <Popover>
      <PopoverTrigger>
        <MoreVertical className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 p-2">
        <Button variant="ghost" onClick={handleDeleteCourse}>
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  );
}
