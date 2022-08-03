const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//creating mongoose connection and new collection
mongoose.connect("mongodb://192.168.178.229:27017/mern_todo");

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

exports.Login = async (data) => {
    try {

        const username = await data.form_name;
        const password = await data.form_password;
        
        const findQuery = await User.findOne({userName:username});
        if(findQuery === null){
            return "Username not avaliable";
        }else{
           const userRes = await bcrypt.compare(password, findQuery.password);
            return await userRes;
        }

    } catch (error) {
           return (error)
       }
    

   
}