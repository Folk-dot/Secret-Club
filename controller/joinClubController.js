require('dotenv').config();
const db=require('../db/queries');

const redirectJoinClub=(req,res)=>{
    return res.render('join-club');
}

const getJoinClub=async(req,res)=>{
    const {passcode}=req.body;
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

module.exports={redirectJoinClub,getJoinClub};