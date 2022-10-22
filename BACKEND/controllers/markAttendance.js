const MarkAttendance = require("../models/markattendance");

exports.markAttendance = async (req, res) => {
  const { date, email } = req.body;

  await MarkAttendance.create({
    email,
    date,
  })
    .then(() =>
      res.status(200).json({ success: true, message: "Successfully Marked !!" })
    )
    .catch((err) => res.status(500).json({ success: false, message: err }));
};
