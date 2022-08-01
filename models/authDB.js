const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//creating mongoose connection and new collection
mongoose.connect("mongodb://172.21.0.145:27017/mern_todo");

const newUserSchema = new mongoose.Schema({
    userName:String,
    email:String,
    password:String
})

const User = new mongoose.model("user", newUserSchema);

exports.Register = async (data) => {
    try {

        const username = await data.form_userName;
        const password = await data.form_password;
        const email = await data.form_email;
        const findQuery = await User.findOne({userName:username});
        if(findQuery){
            return "User already available";
        }else{
           const findEmail = await User.findOne({email:email})
           if(findEmail){
            return "email already taken";
           }else{
            bcrypt.hash(password, saltRounds,async function(err, hash) {
                const createuser = new User({
                    userName:username,
                    email:email,
                    password:hash
               })
            
               await createuser.save();
               
            });
           }
        }
       
    
    
       } catch (error) {
           return (error)
       }
    

   
}