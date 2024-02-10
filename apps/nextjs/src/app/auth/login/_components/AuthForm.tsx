"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { signInWithAzure, signInWithEmail } from "../../actions";

const formSchema = z.object({
  email: z.string().email(),
});

export function AuthForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [logo, setLogo] = useState("/logos/logo-light.svg");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email } = values;
    const response = await signInWithEmail(email);
    console.log({ response });
    toast({
      title: response.error ? "Error" : "Success",
      description: response.error
        ? response.error.message + " If the error persists, contact support."
        : "Check your email for a magic link.",
      variant: response.error ? "destructive" : "default",
    });

    return;
  };

  return (
    <Card className="max-w-sm space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl">Sign in to your account</CardTitle>
        <CardDescription>
          By logging in, you accept our{"\n                            "}
          <Link
            className="text-blue-500 hover:text-blue-700"
            href="https://biso.no/terms"
          >
            terms
          </Link>
          {"\n                            "}
          and
          {"\n                            "}
          <Link
            className="text-blue-500 hover:text-blue-700"
            href="https://biso.no/privacy"
          >
            privacy policy
          </Link>
          .{"\n                            "}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>
        <div className="grid gap-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormDescription>
                        You will receive a magic link in your inbox.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full justify-center">
                  Sign in with Email
                </Button>
              </div>
            </form>
          </Form>
          <div className="flex items-center space-x-2">
            <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
            <span className="text-sm text-zinc-400 dark:text-zinc-300">OR</span>
            <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
          </div>

          <Button
            onClick={() => signInWithAzure()}
            className="w-full justify-center"
            variant="outline"
            onMouseOver={() => setLogo("/logos/logo-dark.svg")}
            onMouseOut={() => setLogo("/logos/logo-light.svg")}
          >
            <div className="flex items-center justify-center">
              <Image
                src={logo}
                alt="Azure"
                width={24}
                height={24}
                className="mr-2"
              />
              Sign in with BISO
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
