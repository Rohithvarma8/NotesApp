import express from 'express';
import dotenv from 'dotenv';
import initialize from './app/app.js';

dotenv.config();


const app = express();
const port = process.env.PORT;

initialize(app)

// check if server is running on the port
app.listen(port,() => console.log(`Server running on port ${port}` ));