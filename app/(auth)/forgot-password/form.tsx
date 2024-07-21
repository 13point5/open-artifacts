"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { SignInFooter, SignUpFooter } from "@/components/auth-form-footers";
import { SocialFooter } from "@/components/social-footer";
import Link from "next/link";

const formSchema = z.object({
  email: z.string(),
});

enum FormStatus {
  Idle,
  Loading,
  Error,
  Success,
}

const ForgotPasswordForm = () => {
  const supabase = createClientComponentClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // state for signin progress, error, and success
  const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.Idle);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormStatus(FormStatus.Loading);

    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/api/auth/update-password`,
    });

    if (error) {
      console.error(error);
      setFormStatus(FormStatus.Error);
      toast.error(error.message, {
        position: "bottom-center",
      });
      return;
    }

    setFormStatus(FormStatus.Success);
    toast.success("Password reset instructions sent to your email", {
      position: "bottom-center",
    });
  };

  return (
    <main className="flex flex-col gap-6 items-center w-full h-screen pt-8 px-4">
      <Link href="/">
        <h1 className="text-4xl font-bold">Open Artifacts</h1>
      </Link>
      <Card className="max-w-sm w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            We will send you instructions to update your password if you have
            used this email to sign up
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {formStatus === FormStatus.Loading && (
                  <>
                    <Loader2Icon className="animate-spin mr-2" /> Sending
                    Instructions
                  </>
                )}

                {formStatus !== FormStatus.Loading && "Send Instructions"}
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col gap-2">
              <SignInFooter />
              <SignUpFooter />
            </CardFooter>
          </form>
        </Form>
      </Card>

      <SocialFooter />
    </main>
  );
};

export default ForgotPasswordForm;
