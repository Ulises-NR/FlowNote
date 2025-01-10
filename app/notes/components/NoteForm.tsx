"use client";

import type { NoteFormProps } from "../types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const NoteForm = ({ schema, fnSubmit, defaultValues }: NoteFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultValues?.title || "",
      content: defaultValues?.content || "",
    },
  });
  const { handleSubmit, formState, control } = form;

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      await fnSubmit(values, defaultValues?._id);
      toast.success(!!defaultValues?._id ? "Note updated" : "Note created");
      router.push("/notes");
    } catch (e) {
      toast.error("Failed to register: " + (e as Error).message);
    }
  }

  return (
    <div className="text-7xl">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-screen-sm p-8 rounded bg-neutral-50 mx-auto space-y-8 my-32"
        >
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Jhon Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="johndoe@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full disabled:bg-current/10"
            type="submit"
            disabled={formState.isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NoteForm;
