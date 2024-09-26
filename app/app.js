import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import meetingNoteRoutes from './routes/index.js';

const initialize = (app) =>{
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    mongoose.connect(process.env.MONGO_CONNECTION);
    meetingNoteRoutes(app);
}

export default initialize;
