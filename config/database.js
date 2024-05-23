const mongoose=require('mongoose');

exports.connectMongoose=()=>{
   mongoose.connect('mongodb://localhost:27017'/DemoPassport)
   .then((e)=>console.log(`Connected to MongoDb:${e.connection.host}`))
   .catch((e)=>console.log(e));
}