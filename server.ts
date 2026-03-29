import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
    const app = express();
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    const PORT = 3000;

    // Chat history (simple in-memory for now)
    const messages: { id: string, user: string, text: string, time: string, timestamp: number }[] = [];

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);
        
        // Send existing messages to the new user
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
            // Keep only last 50 messages
            if (messages.length > 50) messages.shift();
            
            io.emit('new_message', newMessage);
        });

        socket.on('delete_message', (messageId) => {
            const index = messages.findIndex(m => m.id === messageId);
            if (index !== -1) {
                const message = messages[index];
                const now = Date.now();
                // Check if within 10 seconds
                if (now - message.timestamp <= 10000) {
                    messages.splice(index, 1);
                    io.emit('message_deleted', messageId);
                }
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    if (process.env.NODE_ENV !== 'production') {
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'spa',
        });
        app.use(vite.middlewares);
    } else {
        const distPath = path.join(process.cwd(), 'dist');
        app.use(express.static(distPath));
        app.get('*', (req, res) => {
            res.sendFile(path.join(distPath, 'index.html'));
        });
    }

    httpServer.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();
