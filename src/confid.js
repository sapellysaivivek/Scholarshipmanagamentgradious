const mongoose =require("mongoose");
const connect =mongoose.connect("mongodb+srv://SapellySaiVivek:SapellySaiVivek123@cluster1.g1fzy4h.mongodb.net/")
connect.then(res=>{
    console.log("successfull + hi")
}).catch(err =>{
    console.log(err);
})
const loginregis = new mongoose.Schema({
    email:{
        type :String,
        required:true
    },

    password:{
        type :String,
        required :true
    }
})
const adminschema = new mongoose.Schema({
    email:{
        type:String,
        required:true
   },
   password:{
    type:String,
    required:true
    }
    })
const studentschema = new mongoose.Schema({
    email:{
        type:String,
        required:true
   },
   password:{
    type:String,
    required:true
    }
    })
    const loginregisdataadmin = new mongoose.Schema({
    email:{
        type:String,
        required:true
   },
   password:{
    type:String,
    required:true
    }
    })
    const formdataschema = new mongoose.Schema({
        scholarship_name:{
            type:String,
            required:true
            },
            about_Scholarship:{
                type:String,
                required:true
                },
                scholarship_conditions:{
                    type:String,
                    required:true
                },
            scholarship_url:{
                type:String,
                required:true
            }
            })

    const formdatas =mongoose.model("formdatas" , formdataschema )
    const student = mongoose.model("student",studentschema);
    const admin = mongoose.model("admin",adminschema);
const loginregisdata = mongoose.model("loginregisdata",loginregis);
const adminlogindata = mongoose.model("adminlogindata",loginregisdataadmin);
module.exports = {
    loginregisdata,
    admin,
    student, 
    adminlogindata,
    formdatas
}