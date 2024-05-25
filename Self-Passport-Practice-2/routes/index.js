import express from 'express';
import passport from 'passport';

const router=express.Router();
// When the user sends a POST request to this route, Passport authenticates the user based on the middleware created previously.
router.post('/signUp',passport.authenticate('signUp',{session:false}),async(req,res,next)=>{
    res.json({
        message:'SignUp Successful',
        user:req.user
    })
})

router.post('/signin',passport.authenticate('login',async(req,res,next)=>{
    passport.authenticate('login',async(err,user,info)=>{
        try {
               if (err||!user) {
                const error=new Error('An Error Occured');
                return next(error);
               }

               req.login(user,{session:false},async(error)=>{
                if (error) {
                    return next(error);
                }
                const body={_id:user._id,email:user.email};
                const token=jwt.sign({user:body},'TOP_SECRET');
                return res.json({token});
               })




        } catch (error) {
            return next(error);
        }
    })(req,res,next);
}))



module.exports=router;
