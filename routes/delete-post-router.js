const {Router}=require('express');
const deleteRouter=Router();
const getDelete=require('../controller/deleteController');

deleteRouter.post('/:id',getDelete);

module.exports=deleteRouter;