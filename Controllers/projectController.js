const Project = require("../Models/Project");

//addProject      i should add the portfolio and user id in the req.params
exports.addProject = async (req, res) => {
  try {
    const { userId, portfolioId } = req.params;
    if (!userId || !portfolioId) {
      return res
        .status(400)
        .json({ message: "User ID and Portfolio ID are required" });
    }
    const pictures = req.files.map((file) => file.path);
    const { title, description, technologies, link } = req.body;
    if (!title || !description || !technologies || !link) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newProject = await Project({
      title,
      description,
      technologies,
      link,
      pictures: pictures,
      contributers: [userId],
      portfolio: portfolioId,
    }).save();
    res.status(201).json({ message: "project added", user: newProject });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add new project", details: error.message });
  }
};
