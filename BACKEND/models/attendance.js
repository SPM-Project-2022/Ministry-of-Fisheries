const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Attendance = new Schema({
  fullName: String,
  email: String,
  designation: String,
  workedDays: Number,
  extra: String,
  status: String,
  amount: String,
  finalPayment: String,
  datePaid: Date,
});

module.exports = mongoose.model("attendance", Attendance);
