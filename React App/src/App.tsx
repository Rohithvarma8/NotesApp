import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container, CssBaseline } from '@material-ui/core';
import NoteList from './components/NoteList';
import NoteDetails from './components/NoteDetails';
import NoteForm from './components/NoteForm';

// Custom theme for the Material UI components
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

// Note interface for type checking
export interface Note {
  _id: string;
  title: string;
  content: string;
  actionItems: { text: string; completed: boolean }[];
  createdAt: string;
}


const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get<Note[]>('http://localhost:3000/MeetingNotes');
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
    fetchNotes();
  }, []);
  
  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  const handleNoteUpdate = (updatedNote: Note) => {
    setNotes(notes.map(note => (note._id === updatedNote._id ? updatedNote : note)));
    setSelectedNote(updatedNote);
  };

  const handleNoteCreate = (newNote: Note) => {
    setNotes([...notes, newNote]);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note._id !== noteId));
  };
  
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <NoteList notes ={notes} onNoteClick={handleNoteClick} onDeleteNote={handleDeleteNote} />
        {selectedNote && (
          <NoteDetails
          note={selectedNote}
          onNoteUpdate={handleNoteUpdate}
          setSelectedNote={setSelectedNote} 
        />
        )}
        <NoteForm onNoteCreate={handleNoteCreate} />
      </Container>
    </ThemeProvider>
  );
};

export default App;