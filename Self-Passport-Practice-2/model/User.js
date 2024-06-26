import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
})

userSchema.pre('save',async function(next){
    const user=this;
    const hash=await bcrypt.hash(this.password,10);
    this.password=hash;
    next();
})

userSchema.methods.isValidPassword=async function(password){
    const user=this;
   const compare= await bcrypt.compare(password,this.password);
    return compare;
}

const User=mongoose.model('User',userSchema);
export default User;