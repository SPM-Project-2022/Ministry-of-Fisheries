const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MarkAttendance = new Schema({
  email: String,
  date: Date,
});

module.exports = mongoose.model("markattendance", MarkAttendance);
