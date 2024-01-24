"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";

interface Props {
  courseId: string;
}

export function CourseDetails({ courseId }: Props) {
  const [image, setImage] = useState<string | null>(null);

  const utils = api.useUtils();
  const supabase = createClientComponentClient();

  const { data: course } = api.learning.byId.useQuery({ id: courseId });

  const { mutateAsync: updateCourseInfo } = api.learning.update.useMutation({
    onSuccess: async () => {
      await utils.learning.lessons.invalidate(undefined, {
        refetchType: "all",
        queryKey: ["learning.lessons", { id: courseId }],
      });
    },
  });

  const { mutateAsync: removeImage } =
    api.learning.removeImageFromCourse.useMutation({
      onSuccess: async () => {
        await utils.learning.lessons.invalidate(undefined, {
          refetchType: "all",
          queryKey: ["learning.lessons", { id: courseId }],
        });
      },
    });

  const onDrop = async (acceptedFiles: File[]) => {
    console.log(courseId);
    if (acceptedFiles[0]) {
      const { error, data } = await supabase.storage
        .from("courses")
        .upload(
          `images/course-${courseId}/${new Date().getTime()}.png`,
          acceptedFiles[0],
        );
      if (error) {
        console.error(error);
      }
      if (data) {
        const publicUrl = supabase.storage
          .from("courses")
          .getPublicUrl(data.path);
        if (publicUrl.data) {
          await updateCourseInfo({
            id: courseId,
            image: publicUrl.data.publicUrl,
          });
          setImage(publicUrl.data.publicUrl);
        }
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles).catch(console.error);
    },
  });

  useEffect(() => {
    //If the course has an image, set the image state to the course image
    if (course?.image) {
      setImage(course.image);
    }
  }, [course]);

  //Default dropzone styles: flex flex-col items-center justify-center h-32 w-32 border-2 border-gray-300 border-dashed rounded-md"
  //If the dropzone is focused, change the border color to blue, and increase the border width to 3px
  const dropzoneStyles = isDragActive
    ? "flex flex-col items-center justify-center h-32 w-full p-4 border-4 border-blue-500 border-dashed rounded-lg transition-colors duration-300 ease-in-out bg-blue-50 text-blue-700"
    : "flex flex-col items-center justify-center h-32 w-full p-4 border-2 border-gray-300 border-dashed rounded-lg transition-colors duration-300 ease-in-out hover:border-blue-500 hover:bg-blue-50";

  //In this component, we will be able to edit the following course details:
  //Course description
  //Course image

  //The following details are read-only:
  //Created by
  //Updated by
  return (
    <div className="w-full lg:w-2/3">
      <Card key={courseId}>
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <CardTitle>Course Details</CardTitle>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Button
                className="btn btn-primary"
                onClick={() => {
                  void updateCourseInfo({
                    id: courseId,
                    name: course?.name,
                    description: course?.description ?? "",
                  });
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <label htmlFor="description">Course Description</label>
                <Textarea
                  className="form-textarea"
                  name="description"
                  id="description"
                  defaultValue={course?.description ?? ""}
                  onChange={(e) => {
                    void updateCourseInfo({
                      id: courseId,
                      name: course?.name,
                      description: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <label htmlFor="image">Course Image</label>
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-col">
                    {image ? (
                      <div className="relative h-32 w-32">
                        <Image
                          src={image}
                          alt="Course Image"
                          layout="fill"
                          objectFit="cover"
                        />
                        <div className="absolute right-0 top-0">
                          <Trash2
                            className="cursor-pointer"
                            onClick={async () => {
                              await removeImage({
                                id: courseId,
                              });
                              setImage(null);
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div {...getRootProps()} className={dropzoneStyles}>
                        <input {...getInputProps()} />
                        <p>
                          Drag and drop an image file here, or click to select a
                          file
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
