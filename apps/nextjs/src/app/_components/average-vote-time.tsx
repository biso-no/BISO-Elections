"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";

export function AverageVoteTime({ electionId }: { electionId: string }) {
  const { data, error } = api.elections.averageVoteTime.useQuery(electionId);

  if (!data) {
    return (
      <Card className="flex h-full flex-col justify-between">
        <CardHeader className="mb-4">
          <CardTitle>Vote Time</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-grow items-center justify-center">
          <CardDescription>Loading...</CardDescription>
        </CardContent>
        {/* Placeholder for CardFooter if needed */}
      </Card>
    );
  }

  if (error) {
    console.error(error);
    return (
      <Card className="flex h-full flex-col justify-between">
        <CardHeader className="mb-4">
          <CardTitle>Vote Time</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-grow items-center justify-center">
          <CardDescription>{error.message}</CardDescription>
        </CardContent>
        {/* Placeholder for CardFooter if needed */}
      </Card>
    );
  }

  return (
    <Card className="flex h-full flex-col justify-between">
      <CardHeader className="mb-4">
        <CardTitle>Average Vote Time</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-grow items-center justify-center">
        <CardDescription className="text-9xl">{data} s</CardDescription>
      </CardContent>
      {/* Optionally, you can add a CardFooter for additional actions or information */}
      <CardFooter className="mt-4">
        {/* Example: <button className="btn-primary">View More</button> */}
      </CardFooter>
    </Card>
  );
}
