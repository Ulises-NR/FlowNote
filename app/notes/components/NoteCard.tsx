import { Button } from "@/components/ui/button";
import type { Note } from "../types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import NoteRemoveDialog from "./NoteRemoveDialog";

export const NoteCard = ({ note }: { note: Note }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{note.content}</p>
      </CardContent>
      <CardFooter>
        <div className="space-x-2">
          <Button asChild>
            <Link href={{ pathname: "/notes/form", query: { id: note._id } }}>
              Edit note
            </Link>
          </Button>
          <NoteRemoveDialog noteId={note._id} />
        </div>
      </CardFooter>
    </Card>
  );
};
