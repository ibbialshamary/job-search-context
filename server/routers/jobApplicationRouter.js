const router = require("express").Router();
const JobApplication = require("../models/jobApplicationModel");
const auth = require("../middleware/auth");
const Job = require("../models/jobModel");

router.post("/", auth, async (req, res) => {
  try {
    const { name, applicant, cv, coverLetter, location, urls, jobReference } = req.body;

    // find job application so it can be passed as jobReference
    const job = await Job.findById({ _id: jobReference });
    
    const newJobApplication = new JobApplication({
      name,
      applicant,
      cv,
      coverLetter,
      location,
      urls,
      jobReference,
      date: new Date(),
    });

    const savedJobApplication = await newJobApplication.save();

    job.jobApplications.push(newJobApplication);
    await job.save();

    res.json(savedJobApplication);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({
        errorMessage:
          "Unable to save new job application, some required fields may be missing",
      });
  }
});

// get job applications by job reference
router.get("/:jobReference", auth, async (req, res) => {
  try {
    // get matching job applications
    const jobApplications = await JobApplication.find({
      jobReference: req.params.jobReference,
    });
    res.json(jobApplications);
  } catch (err) {
    res
      .status(500)
      .send({ errorMessage: "Unable to retrieve job applications" });
  }
});

// get all job applications
router.get("/", auth, async (req, res) => {
  try {
    const jobApplications = await JobApplication.find({});
    res.json(jobApplications);
  } catch (err) {
    res
      .status(500)
      .send({ errorMessage: "Unable to retrieve job applications" });
  }
});

module.exports = router;
