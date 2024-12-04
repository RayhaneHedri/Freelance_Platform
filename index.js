const express = require("express");
const mongoose = require("mongoose");

//routes import
//const freelancerRoutes = require("./Routes/freelancerRoutes");
const userRoutes = require("./Routes/userRoutes");
const projectRoutes = require("./Routes/projectRoutes");
const portfolioRoutes = require("./Routes/portfolioRoutes");


const app = express();
const env = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
app.use(express.json());

//connect to mongodb
mongoose
  .connect(MONGO_URL, {})
  .then(() => console.log("connected data base"))
  .catch((error) => console.error("not connected error: ", error));

//app.use("/api/freelancers", freelancerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/portfolios", portfolioRoutes);

//file upload
const fs = require("fs");
const path = require("path");

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

//start serveur
app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);
