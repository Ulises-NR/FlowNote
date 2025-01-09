"use server";

import { NoteInputs } from "@/app/notes/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectionToDatabase } from "@/utils/dbConnection";
import Note from "@/models/note.model";
import { auth } from "@/auth";

const findNotes = async () => {
  try {
    const session = await auth();
    if (!session || !session.user) throw new Error("Not authenticated");

    await connectionToDatabase();

    const notes = await Note.find({
      user: session?.user.id,
    });

    return JSON.parse(JSON.stringify(notes));
  } catch (e) {
    throw e;
  }
};

const findNote = async (id: string) => {
  try {
    const session = await auth();
    if (!session || !session.user) throw new Error("Not authenticated");

    await connectionToDatabase();

    const note = await Note.findOne({
      _id: id,
      user: session?.user.id,
    });

    return JSON.parse(JSON.stringify(note));
  } catch (e) {
    throw e;
  }
};

const createNote = async (values: NoteInputs) => {
  try {
    const session = await auth();
    if (!session || !session.user) throw new Error("Not authenticated");

    await connectionToDatabase();

    const note = new Note({
      title: values.title,
      content: values.content,
      user: session?.user.id,
    });

    const savedNote = await note.save();

    return JSON.parse(JSON.stringify(savedNote));
  } catch (e) {
    throw e;
  }
};

const updateNote = async (values: NoteInputs, id: string) => {
  try {
    const session = await auth();
    if (!session || !session.user) throw new Error("Not authenticated");

    await connectionToDatabase();

    const note = await Note.findOne({
      _id: id,
      user: session?.user.id,
    });
    if (!note) throw new Error("Unauthorized");

    note.title = values.title;
    note.content = values.content;

    const savedNote = await note.save();

    return JSON.parse(JSON.stringify(savedNote));
  } catch (e) {
    throw e;
  }
};

const deleteNote = async (id: string) => {
  try {
    const session = await auth();
    if (!session || !session.user) throw new Error("Not authenticated");

    await connectionToDatabase();

    const note = await Note.findOneAndDelete({
      _id: id,
      user: session?.user.id,
    });
    if (!note) throw new Error("Unauthorized");

    revalidatePath(`/notes`);
    return redirect(`/notes`);
  } catch (e) {
    throw e;
  }
};

export { findNote, findNotes, createNote, updateNote, deleteNote };
