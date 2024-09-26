import mongoose from "mongoose";

const meetingNoteSchema = new mongoose.Schema({   // can change the schema anytime.
    title: String,
    content: String,
    actionItems: [{
        text: String,
        completed: Boolean
    }],
    createdDate: { type: Date }
});

const model = mongoose.model('MeetingNote', meetingNoteSchema); // pass schema and title to the model.

export default model; // export model