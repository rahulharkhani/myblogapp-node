var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Blog = require('../schema/blogdetails')

/**
 * insert data into mongodb using post methods
 */
router.get('/', async function (req, res) {
    var totalrecords = await Blog.find();
    var result = await Blog.find().limit(2); //await Blog.find()
    //console.log(result)
    if(result.length == 0) {
        FinalResult = {success: 0, body: "no record found", totalrecords : 0};
    }else{
        FinalResult = {success: 1, body: result, totalrecords : totalrecords.length};
    }
    res.send(JSON.stringify(FinalResult));
    //const result = await Todo.find()
    //result.push({index: result.length + 1, value: req.body.value, done: false, isEditable: false});
});

/**
 * View Blog Data based on pagination
 * */ 
router.post('/', async function(req, res) {   
    const NextPage = parseInt(req.body.NextPage);
    const Limit = req.body.Limit;
    const Lastpage = req.body.Lastpage;
    let moreresult = 1;
    const result = await Blog.find().limit(Limit);
    if(NextPage === Lastpage) {
        moreresult = 0; 
    }
    FinalResult = {success: 1, body: result, currentpage : NextPage, code: "success", moreresult : moreresult};
    res.send(JSON.stringify(FinalResult));
});

module.exports = router;