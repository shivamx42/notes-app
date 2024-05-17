import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js"
import notesRoute from "./routes/notes.route.js"
import path from "path"


dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
})

const __dirname = path.resolve();

const app=express();
app.use(express.json());

app.use("/api/auth",authRoute)
app.use("/api/notes",notesRoute)

app.use(express.static(path.join(__dirname, '/Frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'));
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000!");
})

