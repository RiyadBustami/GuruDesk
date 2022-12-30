const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
app.use(cors());

require('dotenv').config();

require('./config/mongoose.config');

app.use(express.json(), express.urlencoded({ extended: true }));

require('./routes/ticket.routes')(app);

app.listen(port, () => console.log('Listening on port: ',port));
