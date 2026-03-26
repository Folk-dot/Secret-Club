const db=require('../db/queries');

const getDelete=async(req,res)=>{
    if(req.user.role!=='admin'){
        return res.status(403).send('Forbidden');
    }
    const {id}=req.params;
    await db.deletePost(id);
    return res.redirect('/');
}

module.exports=getDelete;