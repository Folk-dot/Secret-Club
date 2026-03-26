const {Router}=require('express');
const joinClubRouter=Router();
const {validatePasscode}=require('../controller/validator');
const {redirectJoinClub,getJoinClub,ensureAuth}=require('../controller/joinClubController');

joinClubRouter.get('/',ensureAuth,redirectJoinClub);
joinClubRouter.post('/',validatePasscode,getJoinClub);

module.exports=joinClubRouter;
