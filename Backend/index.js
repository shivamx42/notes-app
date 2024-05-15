import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js"
import notesRoute from "./routes/notes.route.js"


dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
})

const app=express();
app.use(express.json());

app.listen(3000,()=>{
    console.log("Server is running on port 3000!");
})


app.use("/api/auth",authRoute)
app.use("/api/notes",notesRoute)