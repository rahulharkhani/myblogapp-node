const express = require('express');
const port = 8181;
var loginRouter = require('./routes/login.route');
var registerRouter = require('./routes/register.route');
var addblogRouter = require('./routes/addblog.route');
var listblogRouter = require('./routes/listblog.route');
var singleblogRouter = require('./routes/viewblog.route');
var app = express();
var cors = require('cors');
var bodyParser  = require('body-parser')
require('./middleware/passport')

/**
 * server run
 */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/**
 * mongo db connection
 */
const URL = 'mongodb://localhost:27017/blogdb';
var mongoose = require('mongoose');
mongoose.connect(URL, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("We are ready to connect with database.");
});

/**
 * use cors in app for solving origin error
 */

app.use(cors())

/**
 * add body parser to get request in body
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'));

/** 
 * call router
 */
app.use('/login',loginRouter)
app.use('/register',registerRouter)
app.use('/addblog', addblogRouter)
app.use('/listblog', listblogRouter)
app.use('/view', singleblogRouter)

/*  PASSPORT SETUP  */

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("You have successfully logged in"));
app.get('/error', (req, res) => res.send("error logging in"));

module.exports = app;