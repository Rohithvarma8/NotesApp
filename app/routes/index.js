// routing through meetingNotes resource
import MeetingNotes from './meetingNoteRoutes.js';

const initializeRoutes = (app) =>{
    app.use('/MeetingNotes', MeetingNotes);
}

export default initializeRoutes;