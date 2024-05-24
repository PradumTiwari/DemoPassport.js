const User=require('../models/User');

class UserRepository{
    async create(data){
        try {
            const user=await User.create(data);
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async find({username}){
        try {
            const user=await User.find({
                username:username
            });
            return user;
        } catch (error) {
            console.log(error);
        }
    }
    async findById(id){
        try {
            const user=await User.findById(id);
            return user;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports=UserRepository;