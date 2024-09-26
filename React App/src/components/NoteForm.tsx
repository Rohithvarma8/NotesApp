import React, { useState } from 'react';
import { Paper, TextField, Button, Grid } from '@material-ui/core';
import axios from 'axios';
import { Note } from '../App';

interface NoteFormProps {
  onNoteCreate: (note: Note) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onNoteCreate }) => {
    // State for form fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [actionItems, setActionItems] = useState<{ text: string; completed: boolean }[]>([
    { text: '', completed: false },
  ]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleActionItemChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedActionItems = actionItems.map((item, i) => {
      if (i === index) {
        return { ...item, text: event.target.value };
      }
      return item;
    });
    setActionItems(updatedActionItems);
  };
  
  const handleAddActionItem = () => {
    setActionItems([...actionItems, { text: '', completed: false }]);
  };
// Handles form submission to create a new note
  const handleSubmit = async () => {
    try {
      const noteToCreate = {
        title,
        content,
        actionItems,
        createdAt: new Date().toISOString(),
      };
      const response =  await axios.post('http://localhost:3000/MeetingNotes', noteToCreate);
      const newNote = response.data;
      onNoteCreate(newNote);
      setTitle('');
      setContent('');
      setActionItems([{ text: '', completed: false }]);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };
// Handles form submission to create a new note
  return (
    <Paper elevation={3} style={{ padding: 16, marginTop: 16 }}>
      <TextField
        label="Title"
        value={title}
        onChange={handleTitleChange}
        fullWidth
        style={{ marginBottom: 16 }}
      />
      <TextField
        label="Content"
        value={content}
        onChange={handleContentChange}
        multiline
        rows={4}
        fullWidth
        style={{ marginBottom: 16 }}
      />
      <Grid container spacing={2}>
        {actionItems.map((action, index) => (
          <Grid item xs={12} key={index}>
            <TextField
              label={`Action Item ${index + 1}`}
              value={action.text}
              onChange={(event) => handleActionItemChange(index, event)}
              fullWidth
            />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleAddActionItem}>
        Add Action Item
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginLeft: 16 }}
      >
        Create Note
      </Button>
    </Paper>
  );
};

export default NoteForm;