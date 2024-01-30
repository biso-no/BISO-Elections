import type { CoursesProps } from "./_components/courses";
import { Button } from "~/components/ui/button";
import { Courses } from "./_components/courses";
import { Footer } from "./_components/footer";

const recommendedCourses = [
  {
    id: "5",
    image: "/course-placeholder.png",
    title: "Grow Your Video Editing Skills from Experts",
    subTitle: "Video",
    rating: 4.5,
    price: 39,
    progress: 40,
  },
  {
    id: "6",
    image: "/course-placeholder.png",
    title: "Easy and Creative Food Art Ideas Decoration",
    subTitle: "Photography",
    rating: 4.5,
    price: 59,
    progress: 40,
  },
  {
    id: "7",
    image: "/course-placeholder.png",
    title: "Create Your Own Sustainable Fashion Style",
    subTitle: "Lifestyle",
    rating: 4.5,
    price: 29,
    progress: 0,
  },
  {
    id: "8",
    image: "/course-placeholder.png",
    title: "Grow Your Skills Fashion Marketing",
    subTitle: "Marketing",
    rating: 4.5,
    price: 39,
    progress: 20,
  },
] as CoursesProps["courses"];

const popularCourses = [
  {
    id: "9",
    image: "/course-placeholder.png",
    title: "Grow Your Video Editing Skills from Experts",
    subTitle: "Video",
    rating: 4.5,
    price: 39,
    progress: 40,
  },
  {
    id: "10",
    image: "/course-placeholder.png",
    title: "Easy and Creative Food Art Ideas Decoration",
    subTitle: "Photography",
    rating: 4.5,
    price: 59,
    progress: 40,
  },
  {
    id: "11",
    image: "/course-placeholder.png",
    title: "Create Your Own Sustainable Fashion Style",
    subTitle: "Lifestyle",
    rating: 4.5,
    price: 29,
    progress: 0,
  },
  {
    id: "12",
    image: "/course-placeholder.png",
    title: "Grow Your Skills Fashion Marketing",
    subTitle: "Marketing",
    rating: 4.5,
    price: 39,
    progress: 20,
  },
] as CoursesProps["courses"];

const trendingCourses = [
  {
    id: "1",
    image: "/course-placeholder.png",
    title: "Grow Your Video Editing Skills from Experts",
    subTitle: "Video",
    rating: 4.5,
    price: 39,
    progress: 40,
  },
  {
    id: "2",
    image: "/course-placeholder.png",
    title: "Easy and Creative Food Art Ideas Decoration",
    subTitle: "Photography",
    rating: 4.5,
    price: 59,
    progress: 40,
  },
  {
    id: "3",
    image: "/course-placeholder.png",
    title: "Create Your Own Sustainable Fashion Style",
    subTitle: "Lifestyle",
    rating: 4.5,
    price: 29,
    progress: 0,
  },
  {
    id: "4",
    image: "/course-placeholder.png",
    title: "Grow Your Skills Fashion Marketing",
    subTitle: "Marketing",
    rating: 4.5,
    price: 39,
    progress: 20,
  },
] as CoursesProps["courses"];

export default function CoursesPage() {
  return (
    <div>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Courses courses={recommendedCourses} header="Recommended Courses" />
        <section className="mt-8">
          <div className="rounded-lg bg-gray-100 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">Digital Illustrations</h2>
            <p className="mb-6 text-gray-600">
              Qui aliquip quis magna non sint voluptate officia qui. Laborum sit
              mollit id sint et dolore conse
            </p>
            <Button className="bg-blue-500 text-white">Explore more</Button>
          </div>
        </section>
        <Courses
          courses={popularCourses}
          header="Continue Learning"
          withViewAll
        />
        <Courses
          courses={trendingCourses}
          header="Trending Courses"
          withViewAll
        />
      </main>
    </div>
  );
}
