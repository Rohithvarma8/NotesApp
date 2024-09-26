import React, { useState } from 'react';
import { Paper, Typography, TextField, Checkbox, Button, Grid } from '@material-ui/core';
import axios from 'axios';
import { Note } from '../App';

interface NoteDetailsProps {
    note: Note;
    onNoteUpdate: (updatedNote: Note) => void;
    setSelectedNote: React.Dispatch<React.SetStateAction<Note | null>>; // Add this line
  }
const NoteDetails: React.FC<NoteDetailsProps> = ({ note, onNoteUpdate, setSelectedNote }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedNote, setUpdatedNote] = useState<Note>(note);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedNote({ ...updatedNote, title: event.target.value });
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedNote({ ...updatedNote, content: event.target.value });
  };

  const handleActionItemChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedActionItems = [...updatedNote.actionItems];
    updatedActionItems[index].completed = event.target.checked;
    setUpdatedNote({ ...updatedNote, actionItems: updatedActionItems });
  };
  
// saving the note after update
  const handleSave = async () => {
    try {
      const response = await axios.put<Note>(`http://localhost:3000/MeetingNotes/${updatedNote._id}`, updatedNote);
      onNoteUpdate(response.data);
      setEditMode(false);
      setSelectedNote(null); // Use it here to clear the selected note
      
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };
  

  return (
    <Paper elevation={3} style={{ padding: 16, marginTop: 16 }}>
      {editMode ? (
        <>
          <TextField
            label="Title"
            value={updatedNote.title}
            onChange={handleTitleChange}
            fullWidth
          />
          <TextField
            label="Content"
            value={updatedNote.content}
            onChange={handleContentChange}
            multiline
            rows={4}
            fullWidth
          />
          <Grid container spacing={2}>
            {updatedNote.actionItems.map((action, index) => (
              <Grid item xs={12} key={index}>
                <Checkbox
                checked={action.completed}
                onChange={(event) => handleActionItemChange(index, event)}
                />

                {action.text}
              </Grid>
            ))}
          </Grid>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h5">{note.title}</Typography>
          <Typography variant="body1">{note.content}</Typography>
          <Grid container spacing={2}>
            {note.actionItems.map((action, index) => (
              <Grid item xs={12} key={index}>
                <Checkbox checked={action.completed} disabled />
                {action.text}
              </Grid>
            ))}
          </Grid>
          <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
            Edit
          </Button>
        </>
      )}
    </Paper>
  );
};

export default NoteDetails;