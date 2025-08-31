const express = require("express");
const router = express.Router();
const applydetails = require("./applymongo");


router.get("/", async (req, res) => {
  try {
    const applications = await applydetails.find(); // fetch all records
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch applications ❌" });
  }
});


// POST route -> save application
console.log(applydetails);
router.post("/", async (req, res) => {
  try {
    const { scholarship_name, regid, rlno, regemail } = req.body;

    const result = await applydetails.create({
      scholarship_name,
      regid,
      rlno,
      regemail,
      action1:"Pending",
      action2:"Pending",
      action3:"Pending"
    });

    res.status(201).json({
      message: "Application saved successfully ✅",
      data: result
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save application ❌" });
  }
});

module.exports = router;
