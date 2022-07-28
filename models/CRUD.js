const mongoose = require("mongoose");

//creating mongoose connection and new collection
mongoose.connect("mongodb://172.21.11.12:27017/mern_todo");

//creating new schema for created collection
const newTaskSchema = new mongoose.Schema({
    userName:String,
    taskId:String,
    taskName:String,
    status:String,
    assignDate:String,
    dueDate:String
})

//creating new document for storing data
const Task = new mongoose.model("TaskDB",newTaskSchema)


exports.Create = async(data) => {
    
   try {

    const response = await data;
    const addNewTask = new Task({
        userName : data.userName,
        taskId : data.taskId,
        taskName : data.taskName,
        status : data.status,
        assignDate : data.assignDate,
        dueDate : data.dueDate
    })

    await addNewTask.save();
    return true


   } catch (error) {
       return (error)
   }

   
} 
exports.Read = async() => {
    try {
        const query = await Task.find();
        return (query)
    } catch (error) {
        
    }
}

exports.Delete = async(id)=>{
    try {
        const query = await Task.findByIdAndRemove(id);
        return query;
    } catch (error) {
        console.log(error)
    }
}

exports.Upadte = async(id,status)=>{
    try {
        const query = await Task.findOneAndUpdate({_id:id},{status : status});
        console.log(query);
    } catch (error) {
        console.log(error)
    }
}
