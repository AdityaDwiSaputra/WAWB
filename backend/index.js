// imports
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './src/routes/index.js';

const app = new express();
const port = process.env.PORT // 3000

//database connecting
mongoose
    .connect(process.env.DB_URL)
    .then(()=> console.info("Connected to database!."))
    .catch((err)=> console.log(err));


//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/uploads/"));
app.use(cookieParser()); 

// routers prefix
app.use(router);

//start server
app.listen(port, () => {
    console.info(`Server running in port http://localhost:${port}`);
});