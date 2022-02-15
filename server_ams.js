require("dotenv").config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const Pig = require('pigcolor');

const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


// *? ------------------------------------------------

// ** ------------ 1. All Router Checkpoints --------------------
const routerCheckPointRoute = require('./auth/auth_routes');

// ** --------------------------------------------------------


// *? ------------------------------------------------


//DB Connection
mongoose
    .connect(process.env.DATABASE_D, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        Pig.db();
    });



// Port

const Port = process.env.PORT || 8000;


// ** Testing 

app.get("/", (req, res) => {
    console.log("GET Requests")
    res.json({
        msg: "Willow MVP 1.0.0"
    })
});


// ?? ---------------------------------------------


// ** ------------ 1. All Router Checkpoints --------------------
app.use('/api/web', routerCheckPointRoute);

// ** --------------------------------------------------------

// ?? ---------------------------------------------

// Starting a port here
app.listen(Port, () => {
    Pig.server(Port);
});