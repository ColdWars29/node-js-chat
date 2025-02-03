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

// Append incoming messages to chat
socket.on("chat message", (msg) => {
    addMessage(msg.text); // Extract text from message object
});

// Handle notifications
socket.on("notification", (msg) => {
    addMessage(msg, true);
});

// Load message history when connecting
socket.on("message history", (messages) => {
    messages.forEach((msg) => addMessage(msg.text)); // Properly extract text
});

// Function to add messages to chat
function addMessage(text, isNotification = false) {
    if (!text) return; // Prevent empty messages

    const li = document.createElement("li");
    li.textContent = text; // Display text

    if (isNotification) {
        li.style.fontStyle = "italic";
        li.style.color = "gray";
    }

    document.getElementById("messages").appendChild(li);
}
