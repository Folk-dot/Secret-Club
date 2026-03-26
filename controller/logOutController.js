const getLogOut=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return err;
        }
        res.redirect('/');
    });
};

module.exports=getLogOut;