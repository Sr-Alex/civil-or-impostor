import { Iuser, User } from "../core/user";
import { WebSocket } from "vite";

interface IUsersWs {
	user: User;
	ws: WebSocket;
}

class RoomController {
	private usersWs: IUsersWs[] = [];

	public addUser(user: IUsersWs): void {
		this.usersWs.push(user);
	}

	public drawUsers(): Iuser[] {
		let impostor =
			this.usersWs[Math.floor(Math.random() * this.usersWs.length)];

		this.usersWs.forEach((u) => {
			if (u === impostor) {
				u.user.role = "impostor";
			} else {
				u.user.role = "civil";
			}

			u.user.ready = false;
		});

		console.log("impostor selecionado: " + this.usersWs.indexOf(impostor));

		return this.getUsers;
	}

	public handleUserConnection(ws: WebSocket.WebSocket): void {
		let userWs = {
			ws: ws,
			user: new User({ name: "user" }),
		};

		this.addUser(userWs);

		this.updateAllUsers();
	}

	public handleMessage(ws: WebSocket.WebSocket, msg: any): void {
		let user;

		try {
			user = JSON.parse(msg);
		} catch (error) {
			console.error("[Error]: " + error);
			return;
		}

		if (!User.isUser(user)) return;

		let userWs: IUsersWs = {
			ws: ws,
			user: new User(user),
		};
		this.updateUser(userWs);

		if (this.checkAllUsersReady()) {
			this.drawUsers();
			this.updateAllUsers();
		}
	}

	public handleCloseConnection(ws: WebSocket.WebSocket): void {
		this.usersWs = this.usersWs.filter((u) => u.ws !== ws);
		this.updateAllUsers();
	}

	public updateUser(userWs: IUsersWs): void {
		this.usersWs[this.usersWs.findIndex((u) => u.ws === userWs.ws)] =
			userWs;

		this.usersWs.forEach((u) => {
			u.ws.send(JSON.stringify(this.getUsers));
		});
	}

	public updateAllUsers(): void {
		this.usersWs.forEach((u) => {
			u.ws.send(JSON.stringify(this.getUsers));
		});
	}

	public checkAllUsersReady(): boolean {
		let areReady = this.usersWs.every((u) => u.user.ready);
		return areReady;
	}

	public get getUsers(): Iuser[] {
		let users: Iuser[] = this.usersWs.map((u) => u.user);
		return this.usersWs.map((user) => user.user);
	}
}

export { IUsersWs };
export default RoomController;
