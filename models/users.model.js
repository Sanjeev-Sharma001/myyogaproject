const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, default: "" },
  age: { type: String, lowercase: true, required: true },
  joiningDate: { type: String, unique: true, lowercase: true, required: true },
  batch:{type:String,required:true}
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;