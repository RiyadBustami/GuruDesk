const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
app.use(cors());

require('./config/mongoose.config');

app.use(express.json(), express.urlencoded({ extended: true }));

require('./routes/ticket.routes')(app);

app.listen(port, () => console.log('Listening on port: ',port));
