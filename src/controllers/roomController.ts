import { WebsocketMethod } from "express-ws";
import Room, { IUserWs } from "../core/room";
import { Iuser, User } from "../core/user";

class RoomController {
	private room: Room = new Room();

	public handleUserConnection(ws: any): void {
		let userWs: IUserWs = {
			ws: ws,
			user: new User({ name: "user" }),
		};

		this.room.addUser(userWs);

		this.sendUsersUpdate();
	}

	public handleMessage(ws: any, msg: any): void {
		let user: Iuser;
		let userWs: IUserWs;
		try {
			user = JSON.parse(msg);
		} catch (error) {
			console.error("[Error]: " + error);
			return;
		}

		if (!User.isUser(user)) return;

		userWs = {
			ws: ws,
			user: new User(user),
		};

		this.room.updateUser(userWs);
		this.sendUsersUpdate();
	}

	public handleCloseConnection(ws: any): void {
		this.room.removeUser(ws);
		this.sendUsersUpdate();
	}

	public sendUsersUpdate() {
		let updateMessage = {
			type: "usersUpdate",
			users: this.room.getUsers,
		};

		this.room.usersWs.forEach((u) => {
			let msg = { ...updateMessage, user: u.user };
			u.ws.send(JSON.stringify(msg));
		});
	}
}

export default RoomController;
