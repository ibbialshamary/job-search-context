const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  jobsAdvertised: [{ type: Schema.Types.ObjectId, ref: "jobModel" }],
  jobApplications: [{ type: Schema.Types.ObjectId, ref: "jobModel" }],
  profile: [
    {
      type: Object,
    },
  ],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
