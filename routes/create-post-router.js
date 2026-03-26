const {Router}=require('express');
const createPostRouter=Router();
const {validatePost}=require('../controller/validator');
const {redirectPost,createPost}=require('../controller/createPostController');

createPostRouter.get('/',redirectPost);
createPostRouter.post('/',validatePost,createPost);

module.exports=createPostRouter;