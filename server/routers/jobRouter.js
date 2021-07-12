const router = require("express").Router();
const Job = require("../models/jobModel");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;

    const newJob = new Job({
      name,
    });

    const savedJob = await newJob.save();

    res.json(savedJob);
  } catch (err) {
    res.status(500).send({errorMessage: "Unable to save new job"});
  }
});

router.get("/", auth, async (req, res) => {
  try {
    // get all jobs
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).send({errorMessage: "Unable to retrieve jobs"});
  }
});

module.exports = router;
