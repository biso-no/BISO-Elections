"use client";

import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useToast } from "~/components/ui/use-toast";
import { useInitials } from "~/lib/utils";
import { signOut } from "../auth/actions";

export function ProfileDropdown({ user }) {
  const router = useRouter();
  const toast = useToast();

  const onSignOut = async () => {
    console.log("signing out");
    const response = await signOut();
    router.push("/auth/login");
    toast.toast({
      title: "Signed out",
      description: response.error
        ? response.error.message
        : "You have been signed out",
    });
  };

  const initials: string = useInitials("Markus Heien");

  //If user is provided, trigger onSignOut. If not, redirect to sign in page.
  const handleSignOut = () => {
    if (user) {
      onSignOut();
    } else {
      router.push("/auth/login");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt={initials} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          {user ? "Sign out" : "Sign in"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
