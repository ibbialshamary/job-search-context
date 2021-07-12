const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Job = mongoose.model("customer", jobSchema);

module.exports = Job;
