const dotenv = require("dotenv").config();
const express = require('express');
const path = require('path');
const cors = require("cors");
const connectDB = require('./config/db');
const mainRouter = require('./routes/authRoute.js');
const cookieParser = require('cookie-parser');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketfun=require('./socket/socket.js');



socketfun(server);
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/', mainRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    server.listen(process.env.PORT || 5000, () => {
      console.log(`Server is listening on http://127.0.0.1:${process.env.PORT || 5000}/`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
