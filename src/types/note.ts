
export interface Note {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: number;
  updatedAt: number;
}

export interface NoteFormData {
  title: string;
  content: string;
  imageFile?: File | null;
}
