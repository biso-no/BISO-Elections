"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";

export function AlreadyVoted() {
  const utils = api.useUtils();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thank you for your vote!</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-gray-500">
          The next session will begin shortly!
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          onClick={async () => {
            await utils.voter.activeSession.invalidate();
            await utils.voter.hasVoted.invalidate();
          }}
        >
          You can refresh here
        </Button>
      </CardFooter>
    </Card>
  );
}
