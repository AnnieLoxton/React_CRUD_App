/* For the backend, I followed the walkthrough video that
accompanied this task:
https://www.youtube.com/watch?v=nX7jGHgD9t8&feature=youtu.be&ab_channel=HyperionDev */

const express = require('express');
const cors = require('cors');
const morgan =  require('morgan');

//User body-parser to handle JSON data.
const bodyParser = require("body-parser")

//Set up the port
const port = process.env.PORT || 3001;

const routes = require('./routes'); 

//Init express
const app = express();

//App middleware
// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

//Routes
app.use('/api', routes);

//Listening on PORT
app.listen(port, () => console.log(`Listening on port ${port}`));