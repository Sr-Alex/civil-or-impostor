import { Router } from "express";
import RoomController from "./../controllers/roomController";

const wsRouter = Router();
const room = new RoomController();

export function mountWsRouter() {
	wsRouter.ws("/", function (ws, req) {
		ws.on("message", function (msg) {
			room.handleMessage(ws, msg);
		});

		ws.on("close", function () {
			room.handleCloseConnection(ws);
		});

		room.handleUserConnection(ws);
		console.log("WebSocket connection.");
	});
}

export default wsRouter;
