import passport from "passport";
import passportLocal from "passport-local";
import User from "../model/User";

const localStrategy=passportLocal.Strategy;

// First, add a Passport middleware to handle user registration:


passport.use('signUp',new localStrategy({
    usernameField:'email',
    passwordField:'password',
},

async (email,password,done)=>{
    try {
        const user=await User.create({email,password});
        return done(null,user);
    } catch (error) {
        return done(error);
    }
}
))

passport.use('login',new localStrategy({
    usernameField:'email',
    passwordField:'password',

},


async (email,password,done)=>{
    try {
        const user=await User.findOne({email});

        if(!user){
            return done(null,false,{message:'User Not found'});
        }
        const validate=await user.isValidPassword(password);
        
        if(!validate){
            return done(null,false,{message:'Wrong Password'});
        }
        return done(null,user,{message:'Logged in Successfully'})
    } catch (error) {
        return done(error);
    }
}





))