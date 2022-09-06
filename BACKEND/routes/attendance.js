const router = require("express").Router();
const {
  markAttendance,
  getAttendance,
  getAllAttendance,
  updateAttendance,
  updateByStatus,
} = require("../controllers/attendance");

router.post("/", markAttendance);
router.get("/:id", getAttendance);
router.get("/", getAllAttendance);
router.put("/:id", updateAttendance);
router.put("/status/:id", updateByStatus);

module.exports = router;
