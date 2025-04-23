
import { useState } from "react";
import { NoteForm } from "@/components/NoteForm";
import { NoteCard } from "@/components/NoteCard";
import { useNotes } from "@/context/NotesContext";
import { NoteFormData, Note } from "@/types/note";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Index = () => {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleNoteSubmit = async (formData: NoteFormData) => {
    if (editingNote) {
      await updateNote(editingNote.id, formData);
      setEditingNote(null);
    } else {
      await addNote(formData);
      setIsAddingNote(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      deleteNote(deleteConfirm);
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Note Share</h1>
        <p className="text-muted-foreground">Create, share, and collaborate on notes</p>
      </header>

      {!isAddingNote && !editingNote && (
        <div className="mb-6">
          <Button onClick={() => setIsAddingNote(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Note
          </Button>
        </div>
      )}

      {isAddingNote && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Create a new note</h2>
          <NoteForm 
            onSubmit={handleNoteSubmit} 
            onCancel={() => setIsAddingNote(false)}
            submitLabel="Create Note"
          />
        </div>
      )}

      {editingNote && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Edit note</h2>
          <NoteForm 
            initialData={{
              title: editingNote.title,
              content: editingNote.content,
              imageUrl: editingNote.imageUrl
            }}
            onSubmit={handleNoteSubmit}
            onCancel={() => setEditingNote(null)}
            submitLabel="Update Note"
          />
        </div>
      )}

      {notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={() => setEditingNote(note)}
              onDelete={() => setDeleteConfirm(note.id)}
            />
          ))}
        </div>
      ) : (
        !isAddingNote && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No notes yet. Create your first note!</p>
          </div>
        )
      )}

      <AlertDialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
