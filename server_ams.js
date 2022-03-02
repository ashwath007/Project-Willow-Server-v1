require("dotenv").config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
var https = require('https');
var fs = require('fs');

const session = require('express-session')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const Pig = require('pigcolor');

const app = express();






//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
const corsConfig = {
    origin: 'https://localhost:8080',
    credentials: true,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"]
};
app.use(cors(corsConfig));





// *? ------------------------------------------------

// ** ------------  All Router Checkpoints --------------------
const routerCheckPointRoute = require('./auth/auth_routes');

// ** --------------------------------------------------------

// ** ----------------- Super Admin --------------------
const routerSuperAdminStats = require('./routes/Stats/index');

// ** --------------------------------------------------------

// ** -------------------  Admin  ------------------------
const adminRoute = require('./routes/Admins/index');

// ** --------------------------------------------------------

// ** -------------------  Client  ------------------------
const clientRoute = require('./routes/Clients/index');

// ** --------------------------------------------------------


// ** -------------------  Employee  ------------------------
const employeeRoute = require('./routes/Employee/index');

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



// Session Store Connection
//Mongo DB Store configuraton for session storage
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri: `${process.env.DATABASE_D}`,
    collection: 'session'
});
store.on('error', function(error) {
    console.log(error);
});

let sessionOptions = {
        key: 'SID',
        secret: process.env.SECRET_SESSION,
        cookie: {
            expires: 1000 * 60 * 60 * 5, //5hr
            httpOnly: true,
            sameSite: false,
            secure: true,
        },
        store: store,
        resave: false,
        saveUninitialized: false,
        unset: 'destroy',
        rolling: true
    }
    // app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'secrey-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    },
    store: store
}))




// Port
const Port = process.env.PORT || 8000;

var privateKey = fs.readFileSync('./certificate/key.pem', 'utf8');
var certificate = fs.readFileSync('./certificate/cert.pem', 'utf8');



// ** Testing 

app.get("/", function(req, res) {
    req.session.viewCount++;
    console.log("Session ID - ", req.sessionID)
    req.session.usermode = "Dark";
    req.session.usersettings = "Incomplete";
    res.send(`<h3>Here is the count ${req.session.viewCount}</h3>`)
});








// ?? ---------------------------------------------


// ** ------------ All Router Checkpoints --------------------
app.use('/api/web', routerCheckPointRoute);

// ** --------------------------------------------------------

// ** ----------------- Super Admin --------------------
app.use('/api/web', routerSuperAdminStats);

// ** --------------------------------------------------------


// ** -------------------- Admin --------------------
app.use('/api/web', adminRoute);

// ** --------------------------------------------------------

// ** -------------------- Client --------------------
app.use('/api/web', clientRoute);

// ** --------------------------------------------------------


// ** -------------------  Employee  ------------------------

app.use('/api/web', employeeRoute);

// ** --------------------------------------------------------


// ?? ---------------------------------------------

















// Starting a port here
// app.listen(Port, () => {
//     Pig.server(Port);
// });
var options = { key: privateKey, cert: certificate };
var server = https.createServer(options, app);

server.listen(Port, () => {
    Pig.server(Port);
});