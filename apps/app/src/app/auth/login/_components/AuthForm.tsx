"use client";

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
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sign in to your account</CardTitle>
        <CardDescription>Enter your email below to log in</CardDescription>
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
            </form>
          </Form>
          <Button
            onClick={() => signInWithAzure()}
            className="w-full justify-center"
          >
            Sign in with Azure
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
