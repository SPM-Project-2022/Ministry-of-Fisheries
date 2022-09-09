const router = require("express").Router();

const {
  register,
  login,
  forgotpassword,
  resetpassword,
  registerStaff,
  get,
  getById,
  updateById,
  deleteById,
} = require("../controllers/auth");
const { notifyUser } = require("../utils/notifyUser");

//bellow routes map the controllers
router.route("/register").post(register); // call the auth in controllers

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/notifyuser").post(notifyUser);

router.route("/passwordreset/:resetToken").put(resetpassword);

router.route("/registerStaff").post(registerStaff);

router.route("/").get(get);

router.route("/get/:id").get(getById);

router.route("/update/:id").put(updateById);

router.route("/delete/:id").delete(deleteById);

module.exports = router;
