const {Router}=require('express');
const signUpRouter=Router();
const {getSignUp,redirectSignUp}=require('../controller/signUpController');
const {validateUser}=require('../controller/validator')

signUpRouter.get('/',redirectSignUp);
signUpRouter.post('/',validateUser,getSignUp);

module.exports=signUpRouter;