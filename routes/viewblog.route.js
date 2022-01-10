var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Blog = require('../schema/blogdetails')

/**
 * View Blog Data based on Post Method ID
 * */ 
router.post('/', async function(req, res) {   
    const id = req.body.id;
    console.log(id)
    const result = await Blog.find({ "_id": id });
    FinalResult = {success: 1, body: result, code: "success"};
    res.send(JSON.stringify(FinalResult));
});

module.exports = router;