const MasterSalaryTable = require("../models/masterSalaryTable");

exports.addSalaryIndex = async (req, res) => {
  const { designation } = req.body;
  const id = Number(req.body.id);
  const salary = Number(req.body.salary);

  await MasterSalaryTable.create({
    id,
    designation,
    salary,
  })
    .then(() =>
      res
        .status(200)
        .json({ success: true, message: "Successfully Created First Index" })
    )
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.getAllSalaries = async (req, res) => {
  await MasterSalaryTable.find()
    .then((salaries) => res.status(200).json(salaries))
    .catch((err) => res.status(500).json({ success: false, message: err }));
};

//SPRINT 2
exports.updateSalaryIndex = async (req, res) => {
  //   const { id } = req.params;
  //   const { status } = req.body;
  //   await MasterSalaryTable.findByIdAndUpdate(id, { status })
  //     .then(() =>
  //       res.status(200).json({ success: true, message: "Status Updated" })
  //     )
  //     .catch((err) => res.status(500).json({ success: false, message: err }));
};

exports.deleteSalaryIndex = async (req, res) => {
  //   const { id } = req.params;
  //   const { amount, finalPayment, date } = req.body;
  //   await MasterSalaryTable.findByIdAndUpdate(id, {
  //     status: "PAID",
  //     amount,
  //     finalPayment,
  //     date,
  //   })
  //     .then(() =>
  //       res.status(200).json({ success: true, message: "Status Updated" })
  //     )
  //     .catch((err) => res.status(500).json({ success: false, message: err }));
};
