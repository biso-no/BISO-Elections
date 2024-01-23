"use client";

import { useState } from "react";

import { signInWithEmail, signOut } from "~/app/auth/actions";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

export function ProfilePopover() {
  const { data: user } = api.auth.me.useQuery();
  const [email, setEmail] = useState<string>("");

  const utils = api.useUtils();

  const toast = useToast();

  const onSignOut = async () => {
    console.log("signing out");
    const response = await signOut();
    if (response) {
      toast.toast({
        title: "Signed Out",
        description: "You have been signed out",
      });
    }
  };

  const onSignIn = async () => {
    const response = await signInWithEmail(email);
    if (response) {
      toast.toast({
        title: "Email Sent",
        description: "Check your email for a sign in link",
      });
    }

    if (response?.error) {
      toast.toast({
        title: "Error",
        description: response.error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="ml-auto flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button>Account</Button>
        </PopoverTrigger>
        <PopoverContent className="w-48">
          {user ? (
            <div className="flex flex-col gap-2">
              <Button variant="ghost">Profile</Button>
              <Button variant="ghost">Settings</Button>
              <Button variant="ghost" onClick={onSignOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button variant="ghost" onClick={onSignIn}>
                Sign In
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
