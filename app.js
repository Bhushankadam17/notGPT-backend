import express from "express";
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(express.json());
app.use(cors(corsOptions));

export default app;