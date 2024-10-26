import express from "express";
import expressWs from "express-ws";
import dotenv from "dotenv";

import wsRouter, { mountWsRouter } from "./routes/ws";

dotenv.config();

const app = express();
expressWs(app);
mountWsRouter();

const port = process.env.PORT || 3000;
const router = express.Router();

app.use("/", express.static("public"));
app.use("/room", wsRouter);


app.listen(port, function() {
    console.log(`[Server]: Server listening on http://localhost:${port}`);
})