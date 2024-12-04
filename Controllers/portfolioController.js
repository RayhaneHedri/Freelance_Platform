const Portfolio = require("../Models/Portfolio");

//addPortfolio
exports.addPortfolio = async (req, res) => {
  try {
    const { userId} = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is required" });
    }
    
    const newPortfolio = await Portfolio().save();
    res.status(201).json({ message: "portfolio added", user: newPortfolio });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add new portfolio", details: error.message });
  }
};
