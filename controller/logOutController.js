const getLogOut=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(new Error('Please try again'));
        }
        res.redirect('/');
    });
};

module.exports=getLogOut;