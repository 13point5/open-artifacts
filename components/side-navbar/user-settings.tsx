"use client";

import { Button } from "@/components/ui/button";
import { SettingsIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  getSettings,
  SettingsSchema,
  settingsSchema,
  updateSettings,
} from "@/lib/userSettings";

type Props = {
  showLabel?: boolean;
};

export const UserSettings = ({ showLabel = false }: Props) => {
  const { toast } = useToast();

  const form = useForm<SettingsSchema>({
    resolver: zodResolver(settingsSchema),
    defaultValues: getSettings(),
  });

  function onSubmit(values: SettingsSchema) {
    updateSettings(values);
    toast({ title: "✅ Updated Settings!" });
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full flex items-center justify-start gap-4 px-1">
        <SettingsIcon className="w-6 h-6" />

        {showLabel && <span className="font-medium text-sm">Settings</span>}
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
            </DialogHeader>

            <FormField
              control={form.control}
              name="claudeApiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Claude API Key</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="openaiApiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OpenAI API Key</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
