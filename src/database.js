const mongoose = require('mongoose'); 
const {mongodb} = require('./keys');
mongoose.connect(mongodb.URI, { useNewUrlParser: true })
.then(console.log('db is conneted'))
.catch(err => {
  console.log(err);
});