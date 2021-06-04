const express=require("express");
const router=express.Router();
const usersRepo = require('../repositories/users')
const articlesRepo = require('../repositories/articles')

router
    .get('/', async function(req, res) {
       
        if(req.query.limit && req.query.offset){
            var u={};
            u.list=await usersRepo
                        .getUsers(parseInt(req.query.offset),
                         parseInt(req.query.limit));
            u.count=await usersRepo.getAllUsersCount();
            res.json(u);
        }
        else
        res.json(await usersRepo.getAllUsers());
    })
    .get('/:id', async function(req, res) {
        res.json(await usersRepo.getUser(req.params.id))
    })
    .put("/",async function(req,res){
        var mUser={ id:req.body.id,
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    role:req.body.role
                    };

        res.json(await usersRepo.updateUser(req.body.id,mUser));

    })
    .post("/",async function(req,res){
        var mUser={ id:null,
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    role:req.body.role
            };
        res.json(await usersRepo.addUser(mUser));

    })
    .delete("/:id",async function(req,res){
        res.json(await usersRepo.deleteUser(req.query.id));

    })
    .get("/:id/articles",async (req,res)=>{
        res.json(await articlesRepo.getUserArticles(req.params.id));


    });
    



module.exports=router;