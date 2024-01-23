import Link from "next/link";
import { FileText, Image, MonitorDown } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface CourseResourcesProps {
  course: Course;
}

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

const resources: CardProps[] = [
  {
    icon: <FileText />,
    title: "Local laws fall 2023",
    description: "Local laws regulated by BISO Campus Oslo.",
    href: "#",
  },
  {
    icon: <FileText />,
    title: "BISO Statutes spring 2023",
    description:
      "BISO Statutes regulated by BISO National. These statutes are set every year at the National Assembly.",
    href: "#",
  },
  {
    icon: <FileText />,
    title: "BISO Statutes spring 2023",
    description:
      "BISO Statutes regulated by BISO National. These statutes are set every year at the National Assembly.",
    href: "#",
  },
  {
    icon: <FileText />,
    title: "BISO Statutes spring 2023",
    description:
      "BISO Statutes regulated by BISO National. These statutes are set every year at the National Assembly.",
    href: "#",
  },
];

export function CourseResources({ course }: CourseResourcesProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <MonitorDown className="mr-2 h-6 w-6" />
          <h2 className="text-2xl font-bold">Resources</h2>
        </div>
        <div className="flex flex-row items-center">
          <Link href="#">View all resources</Link>
        </div>
      </div>
      <div className="mt-4 flex flex-row flex-wrap">
        {resources.map((resource) => (
          <Card className="mb-4 mr-4 w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <CardHeader>{resource.icon}</CardHeader>
            <CardContent>
              <CardTitle>{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Link href={resource.href}>View</Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
