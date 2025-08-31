const mongoose =require("mongoose");
const connect =mongoose.connect("mongodb://localhost:27017/logindata")
connect.then(res =>{
    console.log("connected to database notifications")
}).catch(err =>{
    console.log("error in connecting to database")
})
const notificationsdata = new mongoose.Schema({
    scholarship_name:String,
    about_Scholarship:String
    })
const notifications = mongoose.model("notifications",notificationsdata)
module.exports = notifications;