const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  hours: { type: Number, required: true },
});

const Job = mongoose.model("job", jobSchema);

module.exports = Job;
