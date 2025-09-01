const mongoose =require("mongoose");
const connect =mongoose.connect("mongodb+srv://SapellySaiVivek:SapellySaiVivek123@cluster1.g1fzy4h.mongodb.net/")
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