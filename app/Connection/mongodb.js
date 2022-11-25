import mongoose from "mongoose";
const mongoUsername = process.env.DB_USER;
const mongoPassword = process.env.DB_PASS;


const mongoURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.qn9faxx.mongodb.net/?retryWrites=true&w=majority&ssl=true`;

mongoose.connect(
    mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected To DataBase")).catch(err => console.log(err));
