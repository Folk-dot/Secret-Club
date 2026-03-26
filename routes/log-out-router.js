const {Router}=require('express');
const logOutRouter=Router();
const getLogOut=require('../controller/logOutController');

logOutRouter.get('/',getLogOut);

module.exports=logOutRouter;