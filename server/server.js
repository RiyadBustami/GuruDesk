const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));



require('./config/mongoose.config');

app.use(express.json(), express.urlencoded({ extended: true }));

require('./routes/user.routes')(app);
require('./routes/ticket.routes')(app);
require('./routes/comment.routes')(app);

const server = app.listen(port, () => console.log('Listening on port: ',port));
const io = require('socket.io')(server, {cors:true});
io.on("connection", socket=> {
    const ticketId = socket.handshake.query.ticketId
    socket.on(ticketId, data=>io.emit(ticketId, data));
    // socket.join(ticketId);
    // io.in(ticketId).emit('comment', "hello from the server"+ticketId);
    // io.on('comment',data=>console.log(data));
})