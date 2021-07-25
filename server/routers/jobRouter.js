const router = require("express").Router();
const Job = require("../models/jobModel");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { company, title, description, location, salary, hours, tags } =
      req.body;

    const newJob = new Job({
      company,
      title,
      description,
      location,
      salary,
      hours,
      tags,
      date: new Date(),
    });

    const savedJob = await newJob.save();

    res.json(savedJob);
  } catch (err) {
    res.status(500).send({ errorMessage: "Unable to save new job" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    // get all jobs
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).send({ errorMessage: "Unable to retrieve jobs" });
  }
});

// get recent jobs
router.get("/recent", auth, async (req, res) => {
  // get today's date
  let today = new Date(Date.now()).toISOString().split("T")[0];
  try {
    // get all jobs
    const jobs = await Job.find({
      date: { $gte: new Date(today) },
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).send({ errorMessage: "Unable to retrieve jobs" });
  }
});

// get filtered jobs that match location
router.get("/filter/:location/:title", auth, async (req, res) => {
  try {
    if (req.params.location === "all") {
      const allJobs = await Job.find();
      res.json(allJobs);
    } else {
      // get all jobs where location matches request data location
      const filteredJobs = await Job.find({
        $or: [
          { location: { $regex: req.params.location } },
          { title: { $regex: req.params.title } },
        ],
      });
      res.json(filteredJobs);
    }
  } catch (err) {
    res.status(500).send({ errorMessage: "Unable to retrieve jobs" });
  }
});

module.exports = router;
