const router = require("express").Router();
const {
  addSalaryIndex,
  getAllSalaries,
  updateSalaryIndex,
  deleteSalaryIndex,
} = require("../controllers/masterSalaryTable");

router.post("/", addSalaryIndex);
router.get("/", getAllSalaries);
router.put("/:id", updateSalaryIndex);
router.delete("/:id", deleteSalaryIndex);

module.exports = router;
