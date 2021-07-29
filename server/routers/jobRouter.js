const router = require("express").Router();
const Job = require("../models/jobModel");
const User = require("../models/userModel");
const JobApplication = require("../models/jobApplicationModel");
const auth = require("../middleware/auth");
const { application } = require("express");

// jobs advertised details and job applications job details
router.get("/jobs-applied-and-advertised/:userEmail", async (req, res) => {
  try {
    // jobs advertised by user email
    const jobsAdvertised = await Job.find({
      advertiserEmail: req.params.userEmail,
    });

    // job applications relevant to user email
    const jobApplications = await JobApplication.find({
      applicant: req.params.userEmail,
    });

    let jobsByReferenceArray = [];

    for (let i = 0; i < jobApplications.length; i++) {
      // get original job by matching it with job reference
      const jobsByReference = await Job.find({
        _id: jobApplications[i].jobReference,
      });

      jobsByReferenceArray.push(jobsByReference[0]);
    }

    const jobsAdvertisedAndAppliedTo = [
      ...jobsAdvertised,
      ...jobsByReferenceArray,
    ];
    return res.json(jobsAdvertisedAndAppliedTo);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

// get a specific job by application's job reference
router.get("/:jobReference", async (req, res) => {
  try {
    const jobs = await Job.find({ _id: req.params.jobReference }).sort({
      date: -1,
    });
    return res.json(jobs);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

// delete selected job
router.delete("/:jobId", auth, async (req, res) => {
  try {
    // delete job
    const job = await Job.findByIdAndDelete({ _id: req.params.jobId });

    // delete references so user's jobsAdvertised is up to date
    // find advertiser/user
    const user = await User.find({ email: job.advertiserEmail });
    // if job id in user's jobAdvertised matches the jobId in the request params, empty out and update the field in user
    const index = user[0].jobsAdvertised.indexOf(req.params.jobId);
    if (index > -1) {
      user[0].jobsAdvertised.splice(index, 1);
      await user[0].save();
    }
    // above code ends here

    return res.json({
      id: job._id,
      title: job.title,
      status: "Successfully deleted job",
    });
  } catch (err) {
    res.status(500).send({ errorMessage: "Unable to delete job" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const {
      company,
      title,
      description,
      location,
      salary,
      hours,
      tags,
      advertiserEmail,
    } = req.body;

    // find job advertiser so job can be stored in user model
    const user = await User.find({ email: advertiserEmail });

    const newJob = new Job({
      company,
      title,
      description,
      location,
      salary,
      hours,
      tags,
      advertiserEmail,
      date: new Date(),
    });

    const savedJob = await newJob.save();

    // push new job id to advertiser's jobsAdvertised array
    user[0].jobsAdvertised.push(newJob);
    await user[0].save();

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


// get filtered jobs that match location or title
router.get("/filter/:location/:title", auth, async (req, res) => {
  try {
    const location = req.params.location;
    const title = req.params.title;
    let jobResults;

    if (location === "all" || title === "all") {
      console.log("First condition called");
      jobResults = await Job.find();
    }

    if (
      location !== "none" &&
      title !== "none" &&
      location !== "all" &&
      title !== "all"
    ) {
      console.log("Second condition called");
      jobResults = await Job.find({
        $and: [
          { location: { $regex: location } },
          { title: { $regex: title } },
        ],
      });
    }

    if (location === "none" || title === "none") {
      console.log("Third condition called");
      jobResults = await Job.find({
        $or: [{ location: { $regex: location } }, { title: { $regex: title } }],
      });
    }

    res.json(jobResults);
  } catch (err) {
    res.status(500).send({ errorMessage: "Unable to retrieve jobs" });
  }
});

module.exports = router;
