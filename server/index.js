const dotenv = require("dotenv").config();
const express = require('express');
const path = require('path');
const cors = require("cors");
const connectDB =require('./config/db')
const mainRouter=require('./routes/authRoute.js');
const cookieParser = require('cookie-parser');


const app = express();
app.use(cookieParser())
app.use(cors({
    origin: 'http://127.0.0.1:5173', 
    credentials: true
}));
app.use(express.json());
app.use('/', mainRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const start = async () => {

    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is listening on http://127.0.0.1:5000/`);
        })
        
    } catch (error) {
        console.log(error);
    }
}


start();

