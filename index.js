const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 8080;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Notify everyone that a new user joined
    socket.broadcast.emit('notification', 'A new user has joined the chat');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
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
