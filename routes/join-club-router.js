const {Router}=require('express');
const joinClubRouter=Router();
const {validatePasscode}=require('../controller/validator');
const {redirectJoinClub,getJoinClub}=require('../controller/joinClubController');

joinClubRouter.get('/',redirectJoinClub);
joinClubRouter.post('/',validatePasscode,getJoinClub);

module.exports=joinClubRouter;
