const db=require('../db/queries');

const redirectIndex=async(req,res)=>{
    const posts=await db.getPosts();
    return res.render('index',{posts,user:req.user})
}

module.exports=redirectIndex;