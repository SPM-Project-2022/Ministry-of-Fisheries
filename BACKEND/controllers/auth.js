const User = require("../models/auth");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//when we use asynchronous function we need try catch block
exports.register = async (req, res) => {
  //controller for register
  const {
    username,
    email,
    password,
    type,
    nameWithInitials,
    fullName,
    nic,
    address,
    phoneNumber,
    designation,
    branch,
    empId,
  } = req.body; //destructur e method

  const isAvailable = await User.findOne({
    //check the availability of saving data
    empId: { $regex: new RegExp(empId, "i") },
    username: { $regex: new RegExp(username, "i") },
    nic: nic,
  });

  if (isAvailable) {
    // if satisfied return proper error
    return res
      .status(401)
      .json({ error: "Already Planned ! Plz plan something new 😀" });
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
      type,
      nameWithInitials,
      fullName,
      nic,
      address,
      phoneNumber,
      designation,
      branch,
      empId, //this.password filed of user.js in models
    });
    sendToken(user, 200, res);
  } catch (error) {
    if (error.code === 11000) {
      const message = "Already have an account using this email ";
      return res.status(400).json({ success: false, error: message });
    }

    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, error: message });
    }
  }
};

exports.login = async (req, res) => {
  //controller for login
  const { email, password } = req.body;

  if (!email && !password) {
    //backend validation
    return res
      .status(400)
      .json({ success: false, error: "Please enter username and password" });
  } //400 Bad Request

  try {
    const user = await User.findOne({
      email,
    }).select("+password"); //match two passwords

    if (!user) {
      //true
      return res.status(401).json({
        success: false,
        error: "User does not exists. Please contact your admin !",
      });
    }

    const isMatch = await user.matchPasswords(password); //matching the passwords from the received from request and from the db

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid Credentials" });
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      // 500 internal server error
      success: false,
      error: error.message,
    });
  }
};

exports.forgotpassword = async (req, res) => {
  //controller for forgot password
  const { email } = req.body;

  try {
    const user = await User.findOne({ email }); //check for email availability for sending emails

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Email could not be sent" });
    }

    const resetToken = user.getResetPasswordToken(); // get the password reset token

    await user.save();

    const resetURL = `https://ministry-of-fisheries.herokuapp.com/passwordreset/${resetToken}`; //setting a URL to send to the user for emails

    const message = `
        <center>
        <img src='https://i.ibb.co/2MbfFCT/logo.png' />
        <h1>Ministry of Fisheries</h1><br/><br/></br>
        <h3>You have requested a password reset</h3>
        <p>Please go to this URL to reset password</p>
        <a href=${resetURL} clicktracking=off>${resetURL}</a><br/><br/></br>
        <span>Copyright © 2022 Ministry of Fisheries<span></center>
         `;
    try {
      await sendEmail({
        //send email
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, verify: "Email Sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return res
        .status(500)
        .json({ success: false, error: "Email could not be sent" });
    }
  } catch (error) {
    next(error);
  }
};

exports.resetpassword = async (req, res) => {
  //controller for reset password
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex"); //create a hash code using crypto

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }, //find and update the relavant database field
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Reset Token" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ success: true, verify: "Password reset success" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, error: message });
    }
  }
};

//when we use asynchronous function we need try catch block
exports.registerStaff = async (req, res) => {
  //controller for register
  const { username, email, password, type } = req.body; //destructur e method

  try {
    const user = await User.create({
      username,
      email,
      password,
      type, //this.password filed of user.js in models
    });
    sendToken(user, 200, res);
  } catch (error) {
    if (error.code === 11000) {
      const message = "Already have an account using this email ";
      return res.status(400).json({ success: false, error: message });
    }

    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, error: message });
    }
  }
};

exports.get = async (req, res) => {
  await User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ err }));
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  await User.findOne({ empId: id })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json({ err }));
};

exports.updateById = async (req, res) => {
  const { id } = req.params;

  const {
    email,
    nameWithInitials,
    fullName,
    nic,
    address,
    phoneNumber,
    designation,
    branch,
    empId,
  } = req.body;

  await User.findByIdAndUpdate(id, {
    email,
    nameWithInitials,
    fullName,
    nic,
    address,
    phoneNumber,
    designation,
    branch,
    empId,
  })
    .then(() => res.json({ message: "Successfully Update the Employee" }))
    .catch((err) => res.status(500).json({ err }));
};

exports.deleteById = async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json({ success: false, err }));
};

exports.promotions = async (req, res) => {
  const { id } = req.params;

  const { designation } = req.body;

  await User.findByIdAndUpdate(id, {
    designation,
  })
    .then(() => res.json({ message: "Successfully Promoted" }))
    .catch((err) => res.status(500).json({ err }));
};

const sendToken = (user, statusCode, res) => {
  //JWT get
  const token = user.getSignedToken();
  const username = user.username;
  const email = user.email;
  const type = user.type;
  const empId = user.empId;
  const nameWithInitials = user.nameWithInitials;
  res.status(200).json({
    success: true,
    token,
    username,
    email,
    type,
    empId,
    nameWithInitials,
  });
};
