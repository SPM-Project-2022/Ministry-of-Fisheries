const { ET_1 } = require("../templates/ET_1");
const { ET_2 } = require("../templates/ET_2");
const { ET_3 } = require("../templates/ET_3");
const sendEmail = require("./sendEmail");

exports.notifyUser = async (req, res) => {
  const { username, email, password, type = "login", role } = req.body;

  const setTemplate = () => {
    switch (type) {
      case "login":
        return ET_1(username, password);
      case "salary":
        return ET_2;
      case "promo":
        return ET_3(role);
      default:
        return "";
    }
  };
  try {
    await sendEmail({
      //send email
      to: email,
      subject: "Login Details For Ministry Of Fisheries",
      text: setTemplate(),
    });

    res
      .status(200)
      .json({ success: true, verify: "Email is sent to the user" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Email could not be sent" });
  }
};
