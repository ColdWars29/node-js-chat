const socket = io();

document.getElementById("chat-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("message-input");
    
    if (input.value.trim()) {
        socket.emit("chat message", input.value);
        input.value = "";
    }
});

socket.on("chat message", (msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    document.getElementById("messages").appendChild(li);
});
