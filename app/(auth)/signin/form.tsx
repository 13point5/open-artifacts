"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import {
  ForgotPasswordFooter,
  SignUpFooter,
} from "@/components/auth-form-footers";
import { SocialFooter } from "@/components/social-footer";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { OAuthProviderButton } from "@/components/oauth-provider-button";
import { OAuthProviders } from "@/app/types";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

enum FormStatus {
  Idle,
  Loading,
  Error,
  Success,
}

const SignInForm = () => {
  const supabase = createClientComponentClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // state for signin progress, error, and success
  const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.Idle);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormStatus(FormStatus.Loading);

    const res = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (res.error) {
      console.error(res.error);
      setFormStatus(FormStatus.Error);
      toast.error("Could not Sign In", {
        position: "bottom-center",
      });
      return;
    }

    setFormStatus(FormStatus.Success);
    toast.success("Signed In! Taking you to the app", {
      position: "bottom-center",
    });
  };

  const handleOAuthSignIn = async (provider: OAuthProviders) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
      toast.error("Could not Sign In", {
        position: "top-right",
      });
    }
  };

  const handleGoogleSignIn = () => {
    handleOAuthSignIn(OAuthProviders.google);
  };

  const handleGitHubSignIn = () => {
    handleOAuthSignIn(OAuthProviders.github);
  };

  return (
    <main className="flex flex-col gap-6 items-center w-full h-screen pt-8 px-4">
      <Link href="/">
        <h1 className="text-4xl font-bold">Open Artifacts</h1>
      </Link>
      <Card className="max-w-sm w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign In</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4">
          <OAuthProviderButton
            provider={OAuthProviders.google}
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </OAuthProviderButton>

          <OAuthProviderButton
            provider={OAuthProviders.github}
            onClick={handleGitHubSignIn}
          >
            Sign in with GitHub
          </OAuthProviderButton>

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-neutral-500 text-sm">OR</span>
            <Separator className="flex-1" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {formStatus === FormStatus.Loading && (
                  <>
                    <Loader2Icon className="animate-spin mr-2" /> Signing In
                  </>
                )}

                {formStatus !== FormStatus.Loading && "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <ForgotPasswordFooter />
          <SignUpFooter />
        </CardFooter>
      </Card>

      <SocialFooter />
    </main>
  );
};

export default SignInForm;
