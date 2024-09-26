import React from 'react';
import axios from 'axios';
import { Note } from '../App'; 
import { Grid, Paper, Typography, Button } from '@material-ui/core';

interface NoteListProps {
  notes: Note[];
  onNoteClick: (note: Note) => void;
  onDeleteNote: (noteId: string) => void; 
}
// truncating the words according to the length
const NoteList: React.FC<NoteListProps> = ({ notes, onNoteClick, onDeleteNote }) => {
  const truncateContent = (content: string) => {
    const words = content.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    } else {
      return content;
    }
  };
// handle update
  const handleNoteUpdate = async (updatedNote: Note) => {
    try {
      await axios.put('http://localhost:3000/MeetingNotes/${updatedNote._id}', updatedNote);
      // Handle successful update, if necessary
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }
// delete
  const handleNoteDelete = async (noteId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent triggering the onNoteClick
    try {
      await axios.delete('http://localhost:3000/MeetingNotes/${noteId}');
      onDeleteNote(noteId); // Invoke the passed prop function to update the parent component's state
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <Grid container spacing={2}>
      {notes.map(note => (
        <Grid item xs={12} sm={6} md={4} key={note._id}>
          <Paper elevation={3} style={{ cursor: 'pointer', padding: 16 }}>
            <Typography variant="h6" onClick={() => onNoteClick(note)}>{note.title}</Typography>
            <Typography variant="body2">{truncateContent(note.content)}</Typography>
            <Button color="secondary" onClick={(e) => handleNoteDelete(note._id, e)}>Delete</Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default NoteList;