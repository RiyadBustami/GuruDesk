const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/gurudesk', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Somthing went wrong while connecting ', err));