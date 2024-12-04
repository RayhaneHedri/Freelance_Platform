const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  pictures: [{ type: String }],
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  technologies: [{ type: String }],
  link: { type: String },
  portfolio: { type: mongoose.Schema.ObjectId, ref: "Portfolio" },
  contributers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
