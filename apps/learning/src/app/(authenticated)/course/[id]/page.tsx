import { api } from "~/trpc/server";
import { CourseDescription } from "../_components/course-description";
import { CourseProgress } from "../_components/course-progress";
import { CourseResources } from "../_components/course-resources";
import { StartButton } from "../_components/StartButton";

const course = {
  id: 1,
  title: "Course Title",
  description: "Course Description",
  //A long description of the course, about 300 words.
  body: `<p>Welcome to our comprehensive course designed to introduce you to the key concepts and foundational knowledge required for [Subject/Area of Study]. This course is structured to provide a deep dive into the basics, ensuring a solid grounding for beginners, while also offering valuable insights for those looking to refresh their understanding.</p>
<p>The course is also peppered with assessments to track your progress, offering feedback to strengthen your grasp on the subject matter. Furthermore, we have incorporated several hands-on projects to provide you with practical experience, enabling you to apply the concepts learned in a real-world context.</p>
<p>By the end of this course, you will have a comprehensive understanding of [Subject/Area of Study], equipped with the knowledge and skills to advance in your educational or professional journey. Whether you are starting from scratch or looking to enhance your existing knowledge, this course offers a rich learning experience tailored to meet your learning goals.</p>`,

  lessons: [
    {
      id: 1,
      title: "Lesson 1",
      description: "This is the introduction to the course",
      pages: [
        {
          id: 1,
          title: "Page 1",
          description: "This is the introduction to the course",
          content: "This is the content of the page",
          duration: 10,
        },
        {
          id: 2,
          title: "Page 2",
          description: "This is the introduction to the course",
          content: "This is the content of the page",
          duration: 10,
        },
      ],
    },
    {
      id: 2,
      title: "Lesson 2",
      description: "This is the introduction to the course",
      pages: [
        {
          id: 1,
          title: "Page 1",
          description: "This is the introduction to the course",
          content: "This is the content of the page",
          duration: 10,
        },
        {
          id: 2,
          title: "Page 2",
          description: "This is the introduction to the course",
          content: "This is the content of the page",
          duration: 10,
        },
      ],
    },
  ],
};

export default async function CoursePage({ params }) {
  const { id } = params;

  return (
    <div className="container mx-auto px-4 py-4 lg:px-8">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 lg:pr-40">
          <h1 className="mb-4 text-3xl font-bold">{course.title}</h1>
          <p className="mb-4 text-lg">{course.description}</p>
          <StartButton courseId={id} lessonId={course.lessons[0].id} />
          <CourseDescription htmlBody={course.body} />
          {/* CourseProgress placed here for mobile layout */}
          <div className="mb-4 lg:hidden">
            <CourseProgress course={course} />
          </div>
          <div className="flex flex-col gap-4 lg:flex-row">
            <CourseResources course={course} />
          </div>
        </div>
        {/* CourseProgress placed here for desktop layout */}
        <div className="hidden w-full lg:block lg:w-1/4 lg:pl-8">
          <CourseProgress course={course} />
        </div>
      </div>
    </div>
  );
}
