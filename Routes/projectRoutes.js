const express = require("express");
const router = express.Router();
const projectController = require("../Controllers/projectController");


router.post("/addProject/:userId/:portfolioId", projectController.addProject);

module.exports = router;