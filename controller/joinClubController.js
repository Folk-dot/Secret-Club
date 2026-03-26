require('dotenv').config();
const db=require('../db/queries');
const {validationResult,matchedData}=require('express-validator');

const redirectJoinClub=(req,res)=>{
    return res.render('join-club');
}

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/log-in');
};

const getJoinClub=async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).render('join-club',{errors:error.array()});
    }
    const {passcode}=matchedData(req);
    const adminPasscode=process.env.ADMIN_PASSCODE;
    const memberPasscode=process.env.MEMBER_PASSCODE;
    const username=req.user.username
    if(passcode===adminPasscode){
        await db.updateRole(username,'admin');
    }else if(passcode===memberPasscode){
        await db.updateRole(username,'member');
    }else{
        return res.render('join-club',{errors:[{msg:"Incorrect passcode"}]})
    }
    return res.redirect('/');
}

module.exports={redirectJoinClub,getJoinClub,ensureAuth};