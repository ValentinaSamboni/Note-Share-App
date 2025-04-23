
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useNotes } from "@/context/NotesContext";
import { formatDate } from "@/utils/noteUtils";

const SharePage = () => {
  const { id } = useParams<{ id: string }>();
  const { getNote } = useNotes();
  const note = id ? getNote(id) : undefined;

  if (!note) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Note not found</h1>
        <p className="mb-6 text-muted-foreground">
          The note you're looking for doesn't exist or has been deleted.
        </p>
        <Link to="/">
          <Button>Go to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <header className="mb-8">
        <Link to="/" className="text-sm text-blue-500 hover:underline mb-2 block">
          &larr; Back to Notes
        </Link>
        <h1 className="text-2xl font-bold">Shared Note</h1>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{note.title}</CardTitle>
          <div className="text-xs text-muted-foreground">
            Last updated: {formatDate(note.updatedAt)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {note.imageUrl && (
            <div>
              <img 
                src={note.imageUrl} 
                alt="Note image" 
                className="w-full rounded-md object-contain max-h-[400px]" 
              />
            </div>
          )}
          <p className="whitespace-pre-wrap">{note.content}</p>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Created: {formatDate(note.createdAt)}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SharePage;
