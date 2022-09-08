const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnofficialEmployee = new Schema({
  empId: String,
  name: String,
  age: String,
  nic: String,
  address: String,
  phoneNumber: String,

});

const newUnofficialEmployee = mongoose.model("unofficialEmployee", UnofficialEmployee);
module.exports = newUnofficialEmployee;
