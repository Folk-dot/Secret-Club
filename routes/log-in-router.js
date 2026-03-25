const {Router}=require('express');
const logInRouter=Router();
const db=require('../db/queries');

logInRouter.get('/',(req,res)=>{
    return res.render('log-in-form')
})

module.exports=logInRouter;