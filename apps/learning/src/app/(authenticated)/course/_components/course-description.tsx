"use client";
interface CourseDescriptionProps {
  htmlBody: string;
}

export function CourseDescription({ htmlBody }: CourseDescriptionProps) {
  return (
    <div
      className="prose prose-lg"
      dangerouslySetInnerHTML={{ __html: htmlBody }}
    />
  );
}
