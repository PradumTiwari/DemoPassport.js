const LocalStrategy=require('passport-local').Strategy;
const UserRepository=require('./repository/user-repository');
const userRepo=new UserRepository();

exports.initializingPassport=(passport)=>{


    passport.use(new LocalStrategy(async(username,password,done)=>{
   try {
    const user=userRepo.find({username});
   
    if(!user){
        return done(null,false);
    }
  
    if(user.password!=password){
        return done(null,false);
    }
    return done(null,user);

   } catch (error) {
    return done(error,false);
   }
    }
))



//Must do step after Previus boilerPlate
//Basically what it does is it saves userId in req.user

passport.serializeUser((user,done)=>{
    done(null,user.id);
})
//It searches user by the userId
passport.deserializeUser(async(id,done)=>{
    try {
        const user=userRepo.findById(id);
        done(null,user);
    } catch (error) {
        done(error,false);
    }
})

}