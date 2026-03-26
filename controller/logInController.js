const passport=require('../config/passport');

const redirectLogIn=(req,res)=>{
    res.render('log-in-form');
}

const getLogIn=(req,res)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err){
            return err;
        }else if(!user){
            return res.render('log-in-form',{errors:[{msg:info.message}]})
        }
        req.login(user,(err)=>{
            if(err){
                return err
            }
            return res.redirect('/')
        })
    })(req,res);
}

module.exports={redirectLogIn,getLogIn};