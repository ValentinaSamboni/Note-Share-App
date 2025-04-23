
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Note, NoteFormData } from "@/types/note";
import { createNote, fileToDataUrl } from "@/utils/noteUtils";

interface NotesContextType {
  notes: Note[];
  getNote: (id: string) => Note | undefined;
  addNote: (formData: NoteFormData) => Promise<Note>;
  updateNote: (id: string, formData: NoteFormData) => Promise<Note | undefined>;
  deleteNote: (id: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}

interface NotesProviderProps {
  children: ReactNode;
}

export function NotesProvider({ children }: NotesProviderProps) {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Get a note by ID
  const getNote = (id: string) => {
    return notes.find(note => note.id === id);
  };

  // Add a new note
  const addNote = async (formData: NoteFormData): Promise<Note> => {
    let imageUrl: string | undefined;
    
    if (formData.imageFile) {
      imageUrl = await fileToDataUrl(formData.imageFile);
    }
    
    const newNote = createNote(formData, imageUrl);
    setNotes(prevNotes => [newNote, ...prevNotes]);
    return newNote;
  };

  // Update an existing note
  const updateNote = async (id: string, formData: NoteFormData): Promise<Note | undefined> => {
    const noteToUpdate = getNote(id);
    
    if (!noteToUpdate) return undefined;
    
    let imageUrl = noteToUpdate.imageUrl;
    
    if (formData.imageFile) {
      imageUrl = await fileToDataUrl(formData.imageFile);
    }
    
    const updatedNote: Note = {
      ...noteToUpdate,
      title: formData.title,
      content: formData.content,
      imageUrl,
      updatedAt: Date.now(),
    };
    
    setNotes(prevNotes => 
      prevNotes.map(note => note.id === id ? updatedNote : note)
    );
    
    return updatedNote;
  };

  // Delete a note
  const deleteNote = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const value = {
    notes,
    getNote,
    addNote,
    updateNote,
    deleteNote,
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
}
