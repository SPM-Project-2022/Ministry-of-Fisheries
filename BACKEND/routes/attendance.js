const router = require("express").Router();
const {
  markAttendance,
  getAttendance,
  getAllAttendance,
  updateAttendance,
  updateByStatus,
} = require("../controllers/attendance");
const { notifyUser } = require("../utils/notifyUser");

router.post("/", markAttendance);
router.get("/:id", getAttendance);
router.get("/", getAllAttendance);
router.put("/:id", updateAttendance);
router.put("/status/:id", updateByStatus);
router.post("/notify-user", notifyUser);

module.exports = router;
