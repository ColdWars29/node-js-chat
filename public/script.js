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
    addMessage(msg.text);
});

socket.on("notification", (msg) => {
    addMessage(msg, true);
});

// Load message history on connection
socket.on("message history", (messages) => {
    messages.forEach((msg) => addMessage(msg.text));
});

// Function to add messages to chat
function addMessage(text, isNotification = false) {
    const li = document.createElement("li");
    li.textContent = text;

    if (isNotification) {
        li.style.fontStyle = "italic";
        li.style.color = "gray";
    }

    document.getElementById("messages").appendChild(li);
}
