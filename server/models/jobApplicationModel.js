const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  name: { type: String, required: false },
  applicant: { type: String, required: true },
  cv: { type: String, required: true },
  coverLetter: { type: String, required: false },
  location: { type: String, required: true },
  urls: { type: String, required: false },
  jobReference: { type: String, required: true },
  date: { type: Date },
});

const JobApplication = mongoose.model("jobApplication", jobApplicationSchema);

module.exports = JobApplication;
