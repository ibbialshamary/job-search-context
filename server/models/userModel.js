const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  jobsAdvertised: [{ type: Schema.Types.ObjectId, ref: "jobModel" }],
  jobApplications: [{ type: Schema.Types.ObjectId, ref: "jobModel" }],
  profile: [
    {
      name: { type: String, required: true },
      applicant: { type: String, required: true },
      cv: { type: String, required: true },
      coverLetter: { type: String },
      location: { type: String, required: true },
      urls: { type: String },
    },
  ],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
