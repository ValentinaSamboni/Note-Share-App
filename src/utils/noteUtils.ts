
import { Note, NoteFormData } from "@/types/note";

// Generate a unique ID for notes
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Convert a file to a data URL for preview
export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Create a new note from form data
export function createNote(formData: NoteFormData, imageUrl?: string): Note {
  const timestamp = Date.now();
  return {
    id: generateId(),
    title: formData.title,
    content: formData.content,
    imageUrl,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

// Format date for display
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}
