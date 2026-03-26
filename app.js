const express=require('express');
require('dotenv').config();
const path=require('node:path');
const signUpRouter=require('./routes/sign-up-router');
const logInRouter=require('./routes/log-in-router');
const indexRouter=require('./routes/index-router');
const joinClubRouter=require('./routes/join-club-router');
const logOutRouter=require('./routes/log-out-router');
const createPostRouter=require('./routes/create-post-router');
const deleteRouter=require('./routes/delete-post-router');
const passport=require('./config/passport');
const session=require('express-session');
const app=express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use('/',indexRouter);
app.use('/sign-up',signUpRouter);
app.use('/log-in',logInRouter);
app.use('/log-out',logOutRouter);
app.use('/join-club',joinClubRouter);
app.use('/create',createPostRouter);
app.use('/delete',deleteRouter);
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status||500);
    res.render('errors',{message:err.message,status:err.status});
})

const PORT=process.env.PORT
app.listen(PORT,(err)=>{
    if(err){
        throw(err);
    }
    console.log(`app listening on port ${PORT}!`)
})