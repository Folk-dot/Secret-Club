const {Router}=require('express');
const logInRouter=Router();
const {redirectLogIn,getLogIn}=require('../controller/logInController');

logInRouter.get('/',redirectLogIn);
logInRouter.post('/',getLogIn);

module.exports=logInRouter;