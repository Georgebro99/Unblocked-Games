import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = 3000;

// Chat history
const messages = [];

io.on('connection', (socket) => {
    socket.emit('chat_history', messages);

    socket.on('send_message', (data) => {
        const newMessage = {
            id: Math.random().toString(36).substr(2, 9),
            user: data.user || 'Anonymous',
            text: data.text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: Date.now()
        };
        messages.push(newMessage);
        if (messages.length > 50) messages.shift();
        io.emit('new_message', newMessage);
    });

    socket.on('delete_message', (messageId) => {
        const index = messages.findIndex(m => m.id === messageId);
        if (index !== -1) {
            const message = messages[index];
            if (Date.now() - message.timestamp <= 10000) {
                messages.splice(index, 1);
                io.emit('message_deleted', messageId);
            }
        }
    });
});

// Serve the single HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static assets if any (though we aim for single file)
app.use(express.static(__dirname));

httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
