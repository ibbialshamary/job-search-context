const router = require("express").Router();
const JobApplication = require("../models/jobApplicationModel");
const auth = require("../middleware/auth");
const Job = require("../models/jobModel");
const User = require("../models/userModel");

// get a specific user job application
router.get("/:userEmail", async (req, res) => {
  try {
    const jobApplications = await JobApplication.find({
      $and: [
        { name: { $regex: req.params.userEmail } },
      ],
    }).sort({ date: -1 });
    return res.json(jobApplications);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.post("/:email", auth, async (req, res) => {
  try {
    const { name, applicant, cv, coverLetter, location, urls, jobReference } = req.body;

    // find job application so it can be passed as jobReference
    const job = await Job.findById({ _id: jobReference });

    // get logged in user
    const user = await User.find({ email: req.params.email });
    
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

    // push job application to the appropriate job
    job.jobApplications.push(newJobApplication);
    await job.save();

    // push job id to a user's jobsAppliedTo field
    user[0].jobApplications.push(newJobApplication);
    await user[0].save();

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
