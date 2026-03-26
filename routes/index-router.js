const {Router}=require('express');
const indexRouter=Router();
const redirectIndex=require('../controller/indexController');

indexRouter.get('/',redirectIndex);

module.exports=indexRouter;