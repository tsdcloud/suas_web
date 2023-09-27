const express = require("express");
const uuid = require("uuid");
const dotenv = require("dotenv");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require('body-parser')

const app = express();
const PORT = 7000 ;

// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authController = require("./Controller/authController");
const agoraController = require("./Controller/agoraController");
const categoryController = require("./Controller/CategoryController/CategoryController");
const eventsController = require("./Controller/EventsController/EventsController");
const atelierController = require("./Controller/AtelierController/AtelierController");

app.use('/api', authController);
app.use('/categorie', categoryController);
app.use('/event', eventsController);
app.use('/atelier', atelierController);
app.use('/agora', agoraController);

// using the middle wears
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Entery point
app.get("/",  (req, res) => {
  res.json("SUAS web version 2.0.1");
});


// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});