const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MasterSalaryTable = new Schema({
  id: Number,
  designation: String,
  salary: Number,
});

module.exports = mongoose.model("masterSalaryTable", MasterSalaryTable);
