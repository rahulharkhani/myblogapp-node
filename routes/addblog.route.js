var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Blog = require('../schema/blogdetails');
const multer = require("multer");
const path = require("path");
const passport = require('passport');
//const LocalStrategy = require('passport-local');
var jwt = require('jsonwebtoken');

//require('./passport')(passport)

/**
 * 
 * passport.use(new LocalStrategy(
        function(email, password, done) {
            Blogdb.findOne({ username: username }, function(err, user) {
                if (err) { return done(err); }
                console.log("Work")
                if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));



    // passport.authenticate('local', { successRedirect: '/listblog', failureRedirect: '/', failureFlash: true }),
passport.use(new LocalStrategy(
    function(email, password, done) {
        Blogdb.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));
 */

const DIR = 'uploads/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        //cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname))
        cb(null, fileName) //cb(null, file.originalname)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


/**
 * insert blog data into mongodb using post method
 */
/*var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({storage: storage});*/

router.post('/', upload.single('blogimg'), (req, res) => {
//router.post('/', passport.authenticate('jwt', { session: false }), upload.single('blogimg'), (req, res) => {
//router.post('/', upload.single('blogimg'), passport.authenticate('jwt', { session: false }), (req, res) => {    
    let response = 0;
    let UserLoginData = "";
    let msg = "";
    let decoded = "";
    let blogdetails = "";
    const blogData =  new Blog({
        title: req.body.blogtitle,
        description: req.body.description,
        image: req.body.imagename,
        createddate: req.body.createddate
    })
    //console.log("token : "+req.get('Authorization'))
    const token = req.get('Authorization');
    
    try {
        decoded = jwt.verify(token, 'UserLoginToken');
        UserLoginData = decoded.email;
        blogData.save()
        response = 1;
        blogdetails = blogData;
        msg = "Blog added successfully";
    } catch(err) {
        // err
        response = 0;
        blogdetails = "";
        msg = "token expire";
    }
    //const decodedToken = jwt.verify(token, 'bloguser');
    //const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    //const userId = decodedToken.userId;
    //console.log(Math.floor(Date.now() / 1000))
    console.log(decoded);
    FinalResult = {success: response, body: msg, data: UserLoginData, blogdetails: blogdetails};
    res.send(JSON.stringify(FinalResult));
});

module.exports = router;