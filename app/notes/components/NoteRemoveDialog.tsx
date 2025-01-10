"use client";

import { useActionState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteNote } from "@/actions/note";

const NoteRemoveDialog = ({ noteId }: { noteId: string }) => {
  const remove = async () => {
    await deleteNote(noteId);
  };

  const [error, action, isPending] = useActionState(remove, null);

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="destructive">Delete note</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            note.
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <Button disabled={isPending} type="submit">
            Remove note
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NoteRemoveDialog;
