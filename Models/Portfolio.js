const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  projects: [{ type: mongoose.Schema.ObjectId, ref: "Project", default: [] }],
  user: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
