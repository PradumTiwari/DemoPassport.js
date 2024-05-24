const mongoose=require('mongoose');

exports.connectMongoose=()=>{
   mongoose.connect('mongodb://127.0.0.1:27017/DemoPassport')
   .then((e)=>console.log(`Connected to MongoDb:${e.connection.host}`))
   .catch((e)=>console.log(e));
}