var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Blogdb = require('../schema/blogdb')

/**
 * insert data into mongodb using post methods
 */
router.post('/', async function (req, res) {
    //var resu = await User.find()
    const member =  new Blogdb({
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        isactive: 1,
        registereddate: req.body.registereddate
    })
    let result = await Blogdb.find({email: req.body.email});
    if(result.length == 0) {
        member.save()
        FinalResult = {success: "1", body: "member register successfully"};
    }else{
        FinalResult = {success: "0", body: "member already exist"};
    }
    res.send(JSON.stringify(FinalResult));
    //const result = await Todo.find()
    //result.push({index: result.length + 1, value: req.body.value, done: false, isEditable: false});
});

module.exports = router;