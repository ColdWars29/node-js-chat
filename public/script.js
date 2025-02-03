const socket = io();

// Focus input field on page load
document.getElementById("message-input").focus();

document.getElementById("chat-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("message-input");

    if (input.value.trim()) {
        socket.emit("chat message", input.value);
        input.value = "";
        input.focus(); // Keep input focused after sending message
    }
});

// Handle incoming chat messages
socket.on("chat message", (msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    document.getElementById("messages").appendChild(li);
});

// Handle notifications (user join/leave messages)
socket.on("notification", (msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    li.style.fontStyle = "italic";
    li.style.color = "gray";
    document.getElementById("messages").appendChild(li);
});
