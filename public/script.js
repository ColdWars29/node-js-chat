const socket = io();

document.getElementById("message-input").focus();

document.getElementById("chat-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("message-input");

    if (input.value.trim()) {
        socket.emit("chat message", input.value);
        input.value = "";
        input.focus();
    }
});

socket.on("chat message", (msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    document.getElementById("messages").appendChild(li);
});

socket.on("notification", (msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    li.style.fontStyle = "italic";
    li.style.color = "gray";
    document.getElementById("messages").appendChild(li);
});
