require("dotenv").config()
const express=require("express");
const app=express();
const jwt =require("jsonwebtoken")

const users=require("./routes/users");
const articles=require("./routes/articles");
const comments=require("./routes/comments");
const userRepo=require("./repositories/users");
let path = require('path');
//! we can use database to store this access tokens
let ALL_TOKENS=[];


//mideler ware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//login
app.post("/login",async function(req,res){
    let email=req.body.email;
    let password=req.body.password;
    let userByEmail=await userRepo.getUserByEmail(email);
    userByEmail=JSON.parse(JSON.stringify(userByEmail))
    if(userByEmail==null)
        return res.send("<h1>this user not exist!<h1>")
    else if(userByEmail.password!=password)
        return res.send("<h1>this conditions not mutch!")
    else{
        const accesToken=jwt.sign(userByEmail,process.env.ACCESS_TOKEN_SECRET)
        ALL_TOKENS.push(accesToken)
        res.json({accesToken:accesToken});
    }
    
})

app.get("/index.html",(req,res,next)=>{
    let options = {
        root: path.join(__dirname)
    };
      
    let fileName = 'index.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
})
app.use("/users",users);
app.use("/articles",articles);
app.use("/comments",comments);

app.listen(3434,()=>{
    console.log("running..");
});

