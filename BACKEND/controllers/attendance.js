const Attendance = require("../models/attendance");

exports.markAttendance = async (req, res) => {
  const { fullName, email, designation, extra, status = "PENDING" } = req.body;
  const workedDays = Number(req.body.workedDays);

  await Attendance.create({
    fullName,
    email,
    workedDays,
    designation,
    extra,
    status,
  })
    .then(() =>
      res
        .status(200)
        .json({ success: true, message: "Successfully Created First Index" })
    )
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.getAttendance = async (req, res) => {};

exports.getAllAttendance = async (req, res) => {
  await Attendance.find()
    .then((attendances) => res.status(200).json(attendances))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.updateAttendance = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await Attendance.findByIdAndUpdate(id, { status })
    .then(() =>
      res.status(200).json({ success: true, message: "Status Updated" })
    )
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.updateByStatus = async (req, res) => {};
