const path = require('path');
const http = require('https');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({ path: './variables.env'});




//DB connections
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
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));


app.use('/', require('../routes/index'));

app.use(session({
  secret: 'secretit',
  resave: true,
  saveUninitialized: true
}))

//handle production
if(process.env.NODE_ENV +++ 'production') {

  //Static folder
  app.use(express.static(path.join(__dirname, 'public')));
  
  //Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

  //Handle useNewUrlParserapp.get()
}

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
