import { Iuser, User } from "./user";

export interface IUserWs {
	user: User;
	ws: WebSocket;
}

class Room {
	public usersWs: IUserWs[] = [];

	public addUser(user: IUserWs): void {
		this.usersWs.push(user);
		this.clearUsersRoles();
	}

	public removeUser(ws: WebSocket): void {
		this.usersWs = this.usersWs.filter((u) => u.ws !== ws);
		this.clearUsersRoles();
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

	public updateUser(userWs: IUserWs): void {
		this.usersWs[this.usersWs.findIndex((u) => u.ws === userWs.ws)] =
			userWs;

		if (this.checkAllUsersReady()) {
			this.drawUsers();
		}
	}

	public clearUsersRoles(): void {
		this.usersWs.forEach((u) => {
			u.user.role = "";
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

export default Room;
