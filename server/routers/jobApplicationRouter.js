const router = require("express").Router();
const JobApplication = require("../models/jobApplicationModel");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { name, cv, coverLetter, location, urls, jobReference } =
      req.body;

    const newJobApplication = new JobApplication({
      name,
      cv,
      coverLetter,
      location,
      urls,
      jobReference,
      date: new Date(),
    });

    const savedJobApplication = await newJobApplication.save();

    res.json(savedJobApplication);
  } catch (err) {
    res.status(500).send({ errorMessage: "Unable to save new job application, some required fields may be missing" });
  }
});


module.exports = router;
