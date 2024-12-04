const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["Client", "Freelancer", "User"] },
  bio: { type: String},
  contact: { type: String},
  picture: { type: String},
  status: { type: String}, //Optional for clients
  skills: [String], // Optional for freelancers
  ratings: [
    {
      clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number },
      comment: String,
    },
  ], // Optional for freelancers
  portfolio: [
    {
      title: String,
      description: String,
      technologies: [String],
    },
  ], // Optional for freelancers
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password is not modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
