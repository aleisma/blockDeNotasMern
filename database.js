const mongoose = require('mongoose');
const URI = 'mongodb://localhost/mern-task';

mongoose.connect(URI)
     .then(db => console.log('DB Is connected'))
     .catch(err => console.log(err));
     

module.exports = mongoose;
