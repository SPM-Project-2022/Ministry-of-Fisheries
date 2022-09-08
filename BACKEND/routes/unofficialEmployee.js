const router = require("express").Router();
const UnofficialEmployee = require("../models/unofficialEmployee");

router.route("/create").post(async (req, res) => {
    const {
      empId,
      name,
      age,
      nic,
      address,
      phoneNumber,
    } = req.body;
    const date = Date(req.body.date);
  
    const newUnofficialEmployee = new UnofficialEmployee({
      empId,
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
        res.status(200).json({ success: true, message: "Successfully Saved" })
      )
      .catch((err) => res.status(500).json({ success: false, err }));
  });

  module.exports = router;