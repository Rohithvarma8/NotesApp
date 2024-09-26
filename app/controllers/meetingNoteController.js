import * as meetingNoteService from './../services/meetingNoteService.js';
import mongoose from 'mongoose';
import { setError, setResponse } from './../controllers/responseHandler.js'; // Importing the setError and setResponse functions from responseHandler

// get all meetings
export const getAllMeetingNotes = async (req, res) => {
  try {
    const meetingNotes = await meetingNoteService.getAllMeetingNotes();
    setResponse(meetingNotes, res); 
  } catch (error) {
    setError({ error: error.message }, res); 
  }
};

// filter meeting notes using input tilte, startdate, enddate
export const filterMeetingNotes = async (req, res) => {
  const { keyword, startDate, endDate } = req.query;
  try {
    const filteredNotes = await meetingNoteService.filterMeetingNotes(keyword, startDate, endDate);
    setResponse(filteredNotes, res); 
  } catch (error) {
    setError({ error: error.message }, res); 
  }
};

// addingnotes
export const addMeetingNote = async (req, res) => {
  const paramNote = {...req.body};
  try {
    const newNote = await meetingNoteService.addMeetingNote(paramNote);
    setResponse(newNote, res); 
  } catch (error) {
    setError({ error: error.message }, res); 
  }
};

//updating the notes
export const updateMeetingNote = async (req, res) => {
  const { id } = req.params; // name id is matched in route with path parameter
  const updatedData = req.body;
  try {
    const updatedNote = await meetingNoteService.updateMeetingNote(new mongoose.Types.ObjectId(id), updatedData);
    setResponse(updatedNote, res); 
  } catch (error) {
    setError({ error: error.message }, res); 
  }
};

//delete notes
export const deleteMeetingNote = async (req, res) => {
  const { id } = req.params;
  try {
    await meetingNoteService.deleteMeetingNote(id);
    res.sendStatus(204); 
  } catch (error) {
    setError({ error: error.message }, res); 
  }
};

