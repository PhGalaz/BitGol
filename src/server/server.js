const path = require('path');
const http = require('https');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');


//DB connections
require('dotenv').config({ path: './variables.env'});
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log('DB connected'))
  .catch(e => console.log(e));

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/', require('../routes/index'));

//handle production
if(process.env.NODE_ENV +++ 'production') {

  //Static folder
  app.use(express.static(__dirname + '/public/'));

  //Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

  //Handle useNewUrlParserapp.get()
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
