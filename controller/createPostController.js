const db=require('../db/queries');

const redirectPost=(req,res)=>{
    return res.render('create-post');
}

const createPost=async (req,res) => {
    const {message}=req.body;
    const {user_id}=req.user;
    await db.insertPost(message,user_id);
    return res.redirect('/');
}

module.exports={redirectPost,createPost};