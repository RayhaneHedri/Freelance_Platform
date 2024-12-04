const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  status: { type: String, required: true },
  informations: { type: String, required: true },
  date: { type: Date, default: Date.now },
  post: { type: mongoose.Schema.ObjectId, ref: "Post" },
  applicant: { type: mongoose.Schema.ObjectId, ref: "User" },
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
