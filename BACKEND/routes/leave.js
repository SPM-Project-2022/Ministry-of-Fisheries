const router = require("express").Router();
const Leave = require("../models/leave");

router.route("/leaves/create").post(async (req, res) => {
  const {
    type,
    reason,
    time,
    duration,
    nic,
    name,
    status,
    empId,
    nameWithInitials,
  } = req.body;
  const date = Date(req.body.date);

  const newLeave = new Leave({
    type,
    reason,
    time,
    duration,
    nic,
    name,
    status,
    date,
    empId,
    nameWithInitials,
  });
  await newLeave
    .save()
    .then(() =>
      res.status(200).json({ success: true, message: "Successfully Saved" })
    )
    .catch((err) => res.status(500).json({ success: false, err }));
});

router.route("/leaves").get(async (req, res) => {
  await Leave.find()
    .then((leaves) => res.json(leaves))
    .catch((err) => res.status(500).json({ success: false, err }));
});

router.route("/leaves/:id").get(async (req, res) => {
  const { id } = req.params;
  await Leave.findById(id)
    .then((leaves) => res.json(leaves))
    .catch((err) => res.status(500).json({ success: false, err }));
});

router.route("/leaves/delete/:id").delete(async (req, res) => {
  const { id } = req.params;
  await Leave.findByIdAndDelete(id)
    .then(() => res.json({ success: true, message: "Successfully Deleted" }))
    .catch((err) => res.status(500).json({ success: false, err }));
});

router.route("/leaves/update/:id").put(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await Leave.findByIdAndUpdate(id, { status })
    .then(() => res.json({ success: true, message: "Successfully Updated" }))
    .catch((err) => res.json({ success: false, err }));
});

module.exports = router;
