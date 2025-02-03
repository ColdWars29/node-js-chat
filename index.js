const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 8080;

// Store messages in an array (temporary, resets on server restart)
const messageHistory = [];

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Send message history to the newly connected user
    socket.emit('message history', messageHistory);

    // Notify everyone else that a new user joined
    socket.broadcast.emit('notification', 'A new user has joined the chat');

    socket.on('chat message', (msg) => {
        const messageData = { text: msg, timestamp: new Date().toISOString() };
        messageHistory.push(messageData); // Store message in history
        
        // Limit message history to 50 messages (prevents excessive memory use)
        if (messageHistory.length > 50) {
            messageHistory.shift();
        }

        io.emit('chat message', messageData); // Broadcast message
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        io.emit('notification', 'A user has left the chat');
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
