import express from "express";
import connectToDatabase from "./db.js";
import auth from './routes/auth.js';
import userProgress from './routes/userProgress.js';
import note from './routes/note.js';
import courses from './routes/courses.js';

const app = express();

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/userProgress', userProgress);
app.use('/api/note', note);
app.use('/api/courses', courses);

let db = connectToDatabase();

//404 hander
app.use((req, res) =>{
    res.status(404).json({
        message: "route does not exist"
    })
})

//Error handler
app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).send("Some error happened!");
})

app.listen(process.env.PORT, ()=>{
    console.log("Server started on port " + process.env.PORT)
})