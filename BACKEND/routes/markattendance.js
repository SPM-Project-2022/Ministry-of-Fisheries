const router = require("express").Router();
const { markAttendance } = require("../controllers/markAttendance");
const { notifyUser } = require("../utils/notifyUser");

router.post("/", markAttendance);
router.post("/notify-user", notifyUser);

module.exports = router;
