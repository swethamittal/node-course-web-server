const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT||3000;
var app=express();

app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=now+":"+req.method+" "+req.url;
    console.log();
    fs.appendFile('server.log',log+'\n',(err)=>
    {
        if(err){
            console.log(err);
        }
    });
    next();    
});

app.get('/',(req,res)=>{
    // res.send("<h1>hello express!</h1>");
    res.render('home.hbs',{
        pageTitle:'Home page',
       currentYear:new Date().getFullYear(), 
       welcomeMessagge:"welcome to website"
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
       pageTitle:'about page',
       currentYear:new Date().getFullYear() 
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        name:'swetha',
        age:18,
        city:'hyderabad',
        error:'error'
    });
});

app.listen(port,()=>{
    console.log("server is up on port",port);
});