const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/userController");

router.post("/login", UserController.loginUser);
router.post("/addUser", UserController.addUser);
router.put("/updateUser/:id", UserController.updateUser);
router.delete("/deleteUser/:id", UserController.deleteUser);
router.get("/getUser/:id", UserController.getUser);
router.get("/getUsers", UserController.getUsers);


router.post("/addFreelancer", UserController.addFreelancer);

router.post("/addClient", UserController.addClient);

module.exports = router;