const {validationResult,matchedData}=require('express-validator');
const db=require('../db/queries');
const bcrypt=require('bcryptjs');

const getSignUp=async(req,res)=>{
        const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).render('sign-up-form',{errors:error.array()});
        }
        const {fullname,username,password}=matchedData(req);
        const dupUsername=await db.getUserData(username);
        if(dupUsername){
            return res.render('sign-up-form',{errors:[{ msg: 'This username has been used.' }]});
        }
        const hashedPass=await bcrypt.hash(password,10);
        const user=await db.insertUserData(fullname,username,hashedPass);
        req.login(user,(err)=>{
            if(err){
                return next(new Error('Not authenticated'));
            }
            return res.redirect('/')
        })
}

const redirectSignUp=(req,res)=>{
    return res.render('sign-up-form')
}

module.exports={getSignUp,redirectSignUp};