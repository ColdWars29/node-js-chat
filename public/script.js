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

// Handle notifications
socket.on("notification", (msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    li.style.fontStyle = "italic";
    li.style.color = "gray";
    document.getElementById("messages").appendChild(li);
});
