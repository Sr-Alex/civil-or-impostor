interface Iuser {
	name: string;
	role?: string;
	ready?: boolean;
}

class User implements Iuser {
	public name: string;
	public role?: string;

	public ready: boolean = false;

	constructor(user: Iuser) {
		this.name = user.name;
		this.role = user.role;
		this.ready = user.ready || false;
	}

	public static isUser(obj: any): obj is Iuser {
		return obj && typeof obj.name === "string";
	}
}

export { Iuser, User };
