const {Router}=require('express');
const createPostRouter=Router();
const {validatePost}=require('../controller/validator');
const {redirectPost,createPost,ensureAuth}=require('../controller/createPostController');

createPostRouter.get('/',ensureAuth,redirectPost);
createPostRouter.post('/',validatePost,createPost);

module.exports=createPostRouter;