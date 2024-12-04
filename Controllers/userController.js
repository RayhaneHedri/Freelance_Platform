const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


///////////////////////////////////////USER//////////////////////////////////


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token validity
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error.message });
  }
};



// Add User
exports.addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Ensure role is valid
    if (!["Client", "Freelancer", "User"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Create and save user
    const newUser = await new User({ name, email, password, role }).save();
    res.status(201).json({ message: "User added", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to add new user", details: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    // Ensure valid role if provided
    if (role && !["Client", "Freelancer"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, { name, email, password, role }, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user", details: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user", details: error.message });
  }
};

// Get a Single User
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user", details: error.message });
  }
};

// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users", details: error.message });
  }
};






///////////////////////////////////////////FREELANCER////////////////////////////////////////////////////


//Add freelancer
exports.addFreelancer = async (req, res) => {
  try {
    const { name, email, password, skills, ratings, portfolio } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newFreelancer = new User({
      name,
      email,
      password,
      role: "Freelancer",
      skills,
      ratings,
      portfolio,
    });

    await newFreelancer.save();

    res.status(201).json({ message: "Freelancer added successfully", freelancer: newFreelancer });
  } catch (error) {
    res.status(500).json({ error: "Failed to add freelancer", details: error.message });
  }
};


///////////////////////////////////////Client////////////////////////////////////////////////

exports.addClient = async (req, res) => {
  try {
    const { name, email, password, status } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newClient = new User({
      name,
      email,
      password,
      role: "Client",
      status,
    });

    await newClient.save();

    res.status(201).json({ message: "Client added successfully", client: newClient });
  } catch (error) {
    res.status(500).json({ error: "Failed to add client", details: error.message });
  }
};
