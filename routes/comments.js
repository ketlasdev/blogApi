const express=require("express");
//var usersd=require("../respositories/users");
var router=express.Router();
const commentsRepo = require('../repositories/comments')
const articlesRepo = require('../repositories/articles');

//var Sequelize = require("sequelize");

router
    .get('/', async function(req, res) {
        let data=await articlesRepo.getAllArticlesComments({raw: true});
        res.json(data);
    })
    .get('/:id/', async function(req, res) {
        res.json(await commentsRepo.getComment(req.params.id))
    });
module.exports=router;