const router = require("express").Router();
const UnofficialEmployee = require("../models/unofficialEmployee");

router.route("/create").post(async (req, res) => {
  const { id, name, age, nic, address, phoneNumber } = req.body;
  const date = Date(req.body.date);


  const newUnofficialEmployee = new UnofficialEmployee({
    empId: id,
    name,
    age,
    nic,
    address,
    date,
    phoneNumber,
  });
  await newUnofficialEmployee
    .save()
    .then(() =>
      res
        .status(200)
        .json({ success: true, message: "UnofficialEmployee Added" })
    )
    .catch((err) => res.status(500).json({ success: false, err }));
});

router.route("/").get(async (req, res) => {
  await UnofficialEmployee.find()
    .then((unofficialEmployee) => res.json(unofficialEmployee))
    .catch((err) => res.status(500).json({ success: false, err }));
});

router.route("/get/:id").get(async (req, res) => {
  const { id } = req.params;
  await UnofficialEmployee.findById(id)
    .then((unofficialEmployee) => res.json(unofficialEmployee))
    .catch((err) => res.status(500).json({ success: false, err }));
});

router.route("/:id").put(async (req, res) => {
  const { id } = req.params;
  const { name, nic, phoneNumber } = req.body;
  await UnofficialEmployee.findByIdAndUpdate(id, { name, nic, phoneNumber })
    .then(() => res.json({ success: this.trace }))
    .catch((err) => res.status(500).json({ success: false, err }));
});

router.route("/:id").delete(async (req, res) => {
  const { id } = req.params;
  await UnofficialEmployee.findByIdAndDelete(id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json({ success: false, err }));
});
module.exports = router;
