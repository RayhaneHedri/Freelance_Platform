const express = require("express");
const router = express.Router();
const portfolioController = require("../Controllers/portfolioController");


router.post("/addPortfolio/:userId", portfolioController.addPortfolio);

module.exports = router;