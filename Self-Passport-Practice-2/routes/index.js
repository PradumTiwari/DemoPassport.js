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



module.exports=router;
