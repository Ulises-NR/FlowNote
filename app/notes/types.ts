import type { ZodSchema } from "zod";

export type Note = {
  _id: string;
  title: string;
  content: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface NoteFormProps {
  schema: ZodSchema;
  fnSubmit: (values: NoteInputs, id: string) => Promise<any>;
  defaultValues?: Note;
}

export interface NoteInputs {
  title: string;
  content: string;
}
