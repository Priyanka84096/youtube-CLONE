import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import router from "./routes/user.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 4000;

//connect to mongodb
mongoose.connect("mongodb://localhost:27017/youtube").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("error connecting to db-",err);
});

// initializing GridFS to store videos
let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'channel videos',
    });
});

const corsOptions = {
    origin: true,
    credentials: true
};

//all global middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


// all routes
app.use(router);

app.listen(port, () => {
    console.log("Server is running on port 4000");
});
