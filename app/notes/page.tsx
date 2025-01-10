"use client";

import { findNotes } from "@/actions/note";
import { useNote } from "@/hooks/use-notes";
import { NoteCard } from "./components/NoteCard";
import { Note } from "./types";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader/loader";
import Link from "next/link";

const NotesPage = () => {
  const { state: notes, isPending } = useNote([], findNotes);

  return (
    <>
      <h1 className="text-center font-bold mt-12">My Notes</h1>
      <div className="w-full my-8 flex justify-center">
        <Button asChild>
          <Link href="/notes/form">Create note</Link>
        </Button>
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 max-w-screen-xl mx-auto gap-4 p-4">
          {notes.map((note: Note) => (
            <li key={note._id}>
              <NoteCard note={note} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default NotesPage;
