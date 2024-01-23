import { api } from "~/trpc/server";
import { Filter } from "./_components/Filter";
import { Sort } from "./_components/sort";
import { Tutorials } from "./_components/Tutorials";

export default async function Page() {
  const courses = await api.learning.allCourses.query();
  console.log(courses);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full justify-center gap-4">
        <div className="flex max-w-[yourDesiredWidth] flex-col">
          {" "}
          {/* Replace yourDesiredWidth with an appropriate width value */}
          <Filter />
        </div>
        <div className="flex max-w-[yourDesiredWidth] flex-col">
          {" "}
          {/* Apply a similar width value as Filter or as needed */}
          <Sort />
        </div>
      </div>
      <div className="w-full flex-grow">
        <Tutorials courses={courses} />
      </div>
    </div>
  );
}
