const table = document.querySelector("#users-table");
const socket = new WebSocket("ws://localhost:8080/room");

const userNameInput = document.querySelector("#userName");
const readyButton = document.querySelector("#readyButton");
const setNameButton = document.querySelector("#setName");

var user = {
	name: "user",
	ready: false,
};

var users = [];

setNameButton.onclick = handleUserSetName;
readyButton.onclick = handleReadyButton;

socket.onopen = (ws) => {
	socket.send(JSON.stringify(user));

	loadUsers();
	console.log("conectado!");
};

socket.onmessage = (event) => {
	let msg = JSON.parse(event.data);

	if (msg["type"] === "usersUpdate") {
		handleUsersUpdate(msg);
	}

	loadUsers();
	console.table(users);
};

function sendUpdate() {
	socket.send(JSON.stringify(user));
	loadUsers();
}

function handleUsersUpdate(update) {
	let roleElement = document.querySelector("#role");

	users = update.users;

	if ("user" in update) {
		user = update.user;
	}

	roleElement.dataset.role = user["role"] || "";
	roleElement.textContent = user["role"] || "";
}

function loadUsers() {
	let userItems = document.querySelectorAll(".userItem");
	userItems.forEach((item) => table.removeChild(item));

	users.forEach((user) => {
		table.innerHTML += `
			<tr class="userItem">
                <td>${user.name}</td>
                <td>${user.ready}</td>
            </tr>`;
	});
}

function handleUserSetName() {
	let inputValue = userNameInput.value;

	if (!inputValue || inputValue == user.name) return;

	user.name = userNameInput.value;
	sendUpdate();
	userNameInput.value = "";
}

function handleReadyButton() {
	if (user.ready) {
		readyButton.innerHTML = "Ready";
		user.ready = false;
		sendUpdate();

		return;
	}

	readyButton.innerHTML = "Cancelar";
	user.ready = true;
	sendUpdate();
}
