
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Note } from "@/types/note";
import { formatDate } from "@/utils/noteUtils";
import { Edit, Share, Link, X } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface NoteCardProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Generate a shareable URL for this note
  const shareUrl = `${window.location.origin}/share/${note.id}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: "The shareable link has been copied to your clipboard.",
    });
  };
  
  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle>{note.title}</CardTitle>
          <div className="text-xs text-muted-foreground">
            {formatDate(note.updatedAt)}
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          {note.imageUrl && (
            <div className="mb-4">
              <img 
                src={note.imageUrl} 
                alt="Note image" 
                className="w-full rounded-md max-h-[200px] object-cover" 
              />
            </div>
          )}
          <p className="whitespace-pre-wrap text-sm">{note.content}</p>
        </CardContent>
        <CardFooter className="pt-0 justify-between">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShareDialogOpen(true)}>
              <Share className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <X className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Note</DialogTitle>
            <DialogDescription>
              Anyone with this link can view this note.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 mt-2">
            <Input value={shareUrl} readOnly />
            <Button variant="secondary" onClick={handleCopyLink}>
              <Link className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <DialogFooter>
            <Button onClick={() => setShareDialogOpen(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
