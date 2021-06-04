var express=require("express");
//var usersd=require("../respositories/users");
var router=express.Router();
const articlesRepo = require('../repositories/articles')
const commentsRepo = require('../repositories/comments')
const tokenHelper=require("../utiles/tokenHepler")

router
    .get('/',async function(req, res) {
        res.json(await articlesRepo.getAllArticles());
    })
    .get('/:id/', async function(req, res) {
        res.json(await articlesRepo.getArticle(req.params.id))
    })
    .get('/:id/comments', async function(req, res) {
        res.json(await commentsRepo.getArticleComments(req.params.id))
    })
    .post("/",tokenHelper.authenticateToken,async function(req,res){
        
        var mArticle={ 
            id:null,
            title:req.body.title,
            content:req.body.content,
            published:true,
            UserId:req.user.id,
            TagId:null,
            createdAt:new Date(),
            updatedAt:new Date()
        };
        res.json(await articlesRepo.addArticle(mArticle));
    })
    .delete("/:id/",tokenHelper.authenticateToken,async (req,res)=>{
        let article=await articlesRepo.getArticle(req.params.id);
        if(article.UserId!=req.user.id)res.sendStatus(403);
        res.json(articlesRepo.deleteArticle(req.params.id));


    })
    .put("/",tokenHelper.authenticateToken,async (req,res)=>{
        let article=await articlesRepo.getArticle(req.body.id);
        article=JSON.parse(JSON.stringify(article))
        if(article.UserId!=req.user.id)res.sendStatus(403);
        let mArticle=article;
        mArticle.title=req.body.title;
        mArticle.content=req.body.content;
        res.json(articlesRepo.updateArticle(req.body.id,mArticle));


    })
    ;
module.exports=router;