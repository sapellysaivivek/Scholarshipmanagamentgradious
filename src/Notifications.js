const express = require("express")
const app =express.Router()
const notifications = require("./notificationsdatas")
app.get("/" , (req,res)=>{
    
    res.render("notifications")
    console.log("success");
}
)
console.log(notifications)
app.post("/", async (req, res) => {
    try {
        const { scholarship_name, about_Scholarship } = req.body;
        await notifications.create({ scholarship_name, about_Scholarship });
        res.redirect("/notifications");
    } catch (error) {
        console.error(error);
        res.send("Error saving notification");
    }
});
app.post
module.exports = app;
