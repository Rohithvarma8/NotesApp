// CRUD operations for the MeetingNotes
import MeetingNote from './../models/notes.js';


export const getAllMeetingNotes = async () => {
    return await MeetingNote.find();
};

export const filterMeetingNotes = async (keyword, startDate, endDate) => {
    let filter = {};

    if (keyword) {
        filter.$or = [
            { title: { $regex: keyword, $options: 'i' } },
            { content: { $regex: keyword, $options: 'i' } },
            { 'actionItems.text': { $regex: keyword, $options: 'i' } } 
        ];
    }

    if (startDate && endDate) {
        filter.createdDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
        filter.createdDate = { $gte: new Date(startDate) };
    } else if (endDate) {
        filter.createdDate = { $lte: new Date(endDate) };
    }

    return await MeetingNote.find(filter);
};

export const addMeetingNote = async (meetingNoteData) => {
    return await MeetingNote.create(meetingNoteData);
};

export const updateMeetingNote = async (id, updatedData) => {
    return await MeetingNote.findByIdAndUpdate(id, updatedData, { new: true });
};

export const deleteMeetingNote = async (id) => {
    return await MeetingNote.findByIdAndDelete(id);
};


