const express = require('express')
require('dotenv').config();
const cors = require('cors')
const commentRouter = require('./routes/comments.route');
const loginRouter = require('./routes/login.route');
const io = require('socket.io')(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('newComment', (comment) => {
        io.emit('newComment', comment);
    });
}
);


const PORT =  5050;
const app = express();
app.use(cors());
app.use(express.json());


app.use('/api',commentRouter)
app.use('/api',loginRouter)

app.listen(PORT, () => {
  console.log(`Server listening on port localhost "http://localhost:${PORT}"`);
});