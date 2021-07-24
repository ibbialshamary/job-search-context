const router = require("express").Router();
const Job = require("../models/jobModel");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { company, title, description, location, salary, hours } = req.body;

    const newJob = new Job({
      company,
      title,
      description,
      location,
      salary,
      hours
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

// get filtered jobs that match location
router.get("/filter/:location", auth, async (req, res) => {
  try {
    // get all jobs where location matches request data location
    const jobs = await Job.find({"location": req.params.location});
    res.json(jobs);
  } catch (err) {
    res.status(500).send({errorMessage: "Unable to retrieve jobs"});
  }
});

module.exports = router;
