import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";

function CourseItem(props: {
  id: string;
  image: string;
  title: string;
  subTitle: string;
  rating: number;
  price: number;
  progress: number;
}) {
  //Render placeholder if no image is provided
  const image = props.image || "/placeholder.png";

  return (
    <Link href={`/course/${props.id}`}>
      <Card className="flex w-full flex-col" key={props.id}>
        <Image
          alt={props.title}
          className="h-40 w-full object-cover"
          height="200"
          src={image}
          style={{
            aspectRatio: "250/200",
            objectFit: "cover",
          }}
          width="250"
        />
        <CardContent className="flex flex-grow flex-col justify-between">
          <div>
            <div className="mb-1 text-xs uppercase text-gray-500">
              {props.subTitle}
            </div>
            <div className="mb-1 text-sm font-semibold">{props.title}</div>
          </div>
          <div>
            <div className="mb-2 flex items-center text-sm text-yellow-400">
              <StarIcon className="h-4 w-4" />
              <span>{props.rating} (123)</span>
            </div>
            {props.progress > 0 && (
              <div className="rounded-ful h-2 w-full">
                <Progress
                  value={props.progress}
                  className="h-full rounded-full"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export interface CoursesProps {
  withViewAll?: boolean;
  header: string;
  courses: {
    id: string;
    image: string;
    title: string;
    subTitle: string;
    rating: number;
    price: number;
    progress: number;
  }[];
}

export function Courses({
  header,
  courses,
  withViewAll = false,
}: CoursesProps) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="mb-4 text-lg font-semibold">{header}</h2>
        {withViewAll && (
          <a className="text-sm text-blue-500 hover:underline" href="#">
            View all
          </a>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((course) => (
          <CourseItem key={course.title} {...course} id={course.id} />
        ))}
      </div>
    </section>
  );
}

function StarIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
