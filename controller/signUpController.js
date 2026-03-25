const {validationResult,matchedData}=require('express-validator');
const db=require('../db/queries');
const bcrypt=require('bcryptjs');

const getSignUp=async(req,res)=>{
        const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).render('/sign-up',{error:error});
        }
        const {fullname,username,password}=matchedData(req);
        const user=await db.getUserData(username);
        if(user){
            return res.render('/sign-up',{error:'This username has been used.'});
        }
        const hashedPass=bcrypt.hash(password,10);
        await db.insertUserData(fullname,username,hashedPass);
        res.render('/log-in')
}