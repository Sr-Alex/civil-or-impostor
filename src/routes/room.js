import express from "express";
const router = express.Router();

let sockets = [];

router.ws("/enterRoom", (ws, req) => {
    ws.on("message", (msg) => {
        console.log(msg);
    })

    console.log("socket conectado!");
    sockets.push(ws);
})

export default router;