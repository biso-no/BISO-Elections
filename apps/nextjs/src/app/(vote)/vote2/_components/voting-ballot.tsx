"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { Step, Steps } from "~/components/ui/steps";

interface VotingBallotProps {
  sessions: {
    title: string;
    description: string;
    candidates: { id: number; name: string }[];
  }[];
}

export function VotingBallot({ sessions }: VotingBallotProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(
    null,
  );

  const handleSelectCandidate = (id: number) => {
    setSelectedCandidate(id);
  };

  const handleSubmitVote = () => {
    if (selectedCandidate === null) {
      return;
    }

    console.log(`Voted for candidate with ID: ${selectedCandidate}`);
  };

  return (
    <Card className="w-full max-w-lg">
      <Steps>
        {sessions.map((session) => (
          <Step key={session.title}>
            <CardHeader className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="font-bold">Test</div>
                <div className="text-sm">Choose one candidate for</div>
              </div>
              {/* You can replace the image with session data */}
            </CardHeader>
            <CardContent className="grid gap-4">
              {session.candidates.map((candidate) => (
                <div key={candidate.id} className="flex items-center space-x-2">
                  <Checkbox
                    className="h-4 w-4"
                    id={`candidate${candidate.id}`}
                    onChange={() => handleSelectCandidate(candidate.id)}
                    checked={selectedCandidate === candidate.id}
                  />
                  <Label
                    className="flex-1 font-medium leading-none"
                    htmlFor={`candidate${candidate.id}`}
                  >
                    {candidate.name}
                  </Label>
                  {/* You can replace the image with candidate data */}
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant="outline"
                onClick={handleSubmitVote}
              >
                Submit Vote
              </Button>
            </CardFooter>
          </Step>
        ))}
      </Steps>
    </Card>
  );
}
