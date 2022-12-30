const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT;
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

require('dotenv').config();

require('./config/mongoose.config');

app.use(express.json(), express.urlencoded({ extended: true }));

require('./routes/ticket.routes')(app);

app.listen(port, () => console.log('Listening on port: ',port));
