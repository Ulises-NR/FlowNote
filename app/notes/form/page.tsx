"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import NoteForm from "../components/NoteForm";
import { createNoteSchema, updateNoteSchema } from "@/schemas/note.schema";
import { findNote, createNote, updateNote } from "@/actions/note";
import { Loader } from "@/components/loader/loader";

const NoteFormPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const queries = useSearchParams();
  const queryId = queries.get("id");
  const schema = !!queryId ? updateNoteSchema : createNoteSchema;
  const fnSubmit = !!queryId ? updateNote : createNote;
  const [defaultValues, setDefaultValues] = useState(null);

  useEffect(() => {
    if (!!queryId) {
      findNote(queryId).then((note) => {
        setDefaultValues(note);

        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [queryId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <NoteForm
          schema={schema}
          fnSubmit={fnSubmit}
          {...(defaultValues ? { defaultValues } : {})}
        />
      )}
    </>
  );
};

export default NoteFormPage;
