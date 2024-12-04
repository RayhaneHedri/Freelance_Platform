const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  picture: { type: String },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  applications: { type: mongoose.Schema.ObjectId, ref: "Application" },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
