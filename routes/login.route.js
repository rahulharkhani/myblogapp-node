var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Blogdb = require('../schema/blogdb')
var jwt = require('jsonwebtoken');

/**
 * Login api with user
 */
router.post('/', async function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let result = await Blogdb.find({email: email, password: password, isactive: 1});
    console.log(result);
    if(result.length > 0) {
        /**
         * generate jwt for login user to maintain session
         */
        //const token = jwt.sign({ email: email }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
        var token = jwt.sign({ email: email, exp: Math.floor(Date.now() / 1000) + (60 * 5) }, 'UserLoginToken');
        //var token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 2), userdata: result }, 'bloguser');
        console.log(token)
        FinalResult = {success: 1, body: "login successfully", token: token};
        res.send(JSON.stringify(FinalResult));
    }else{
        FinalResult = {success: 0, body: "invalid username or password", token: ""};
        res.send(JSON.stringify(FinalResult));
    }

    //const result = await Todo.find()
    //result.push({index: result.length + 1, value: req.body.value, done: false, isEditable: false});
    
});

/* GET home page. */
/*router.get('/', function(req, res, next) {
    FinalResult = {message: "success", body: result, code: "success"};
    res.send(JSON.stringify(FinalResult));
});*/

module.exports = router;