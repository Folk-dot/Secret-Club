const db=require('../db/queries');
const {validationResult,matchedData}=require('express-validator');

const ensureAuth=(req,res,next)=>{
    if(req.isAuthenticated()) return next();
    res.redirect('/log-in');
}

const redirectPost=(req,res)=>{
    return res.render('create-post');
}

const createPost=async (req,res) => {
    const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).render('create-post',{errors:error.array()});
        }
    const {message}=matchedData(req);
    const {user_id}=req.user;
    await db.insertPost(message,user_id);
    return res.redirect('/');
}

module.exports={redirectPost,createPost,ensureAuth};