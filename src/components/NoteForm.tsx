
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Image, Upload, X } from "lucide-react";
import { NoteFormData } from "@/types/note";

interface NoteFormProps {
  initialData?: {
    title: string;
    content: string;
    imageUrl?: string;
  };
  onSubmit: (data: NoteFormData) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

export function NoteForm({ initialData, onSubmit, onCancel, submitLabel = "Save" }: NoteFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(initialData?.imageUrl);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(undefined);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      content,
      imageFile,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full">
        <CardHeader className="pb-3">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-medium border-none bg-transparent focus-visible:ring-0 px-0"
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Take a note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] border-none bg-transparent focus-visible:ring-0 px-0 resize-none"
          />
          
          {imagePreview ? (
            <div className="relative">
              <img 
                src={imagePreview} 
                alt="Note image" 
                className="w-full rounded-md max-h-[300px] object-cover" 
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <Upload className="h-4 w-4" />
                <span>Upload Image</span>
              </Button>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-0">
          {onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={!title && !content && !imagePreview}>
            {submitLabel}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
