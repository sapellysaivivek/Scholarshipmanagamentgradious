const mongoose = require("mongoose");

// connect to DB
mongoose.connect("mongodb+srv://SapellySaiVivek:SapellySaiVivek123@cluster1.g1fzy4h.mongodb.net/")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const applySchema = new mongoose.Schema({
  scholarship_name: {
    type: String,
    required: true
  },
  regid: {
    type: String,
    required: true
  },
  rlno: {
    type: String,
    required: true
  },
  regemail: {
    type: String,
    required: true
  },
  action1:{
    type:String,
    required:true
  },
  action2:{
    type:String,
    required:true
  },
  action3:{
    type:String,
    required:true
  }
});

// Create Model
const ApplyDetails = mongoose.model("ApplyDetails", applySchema);
module.exports = ApplyDetails;
