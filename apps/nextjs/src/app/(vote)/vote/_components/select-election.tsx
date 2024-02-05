"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

export const SelectElection = () => {
  const toast = useToast();

  const router = useRouter();

  const { data: elections } = api.voter.all.useQuery();

  useEffect(() => {
    if (elections?.length === 1) {
      router.push(`/vote/${elections[0]?.election.id}`);
    }
  }, [elections, router]);

  const onSelect = async (electionId: string) => {
    try {
      console.log(electionId);
      router.push(`/vote/${electionId}`);
    } catch (error) {
      toast.toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  //For each election, display them in cards. When one is selected trigger the onSelect function
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Select an election</h1>
        <div className="grid grid-cols-1 gap-4">
          {elections?.map((election) => (
            <Card key={election.election.id} className="w-80">
              <CardHeader>
                <CardTitle>{election.election.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{election.election.campus}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button onClick={() => onSelect(election.id)}>Join</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
