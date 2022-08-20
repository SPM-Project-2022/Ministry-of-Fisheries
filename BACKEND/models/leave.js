const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Leave = new Schema({
  type: String,
  reason: String,
  date: Date,
  time: String,
  duration: String,
  nic: String,
  name: String,
  status: String,
  empId:String,
  nameWithInitials:String
});

const newLeave = mongoose.model("leave", Leave);
module.exports = newLeave;
