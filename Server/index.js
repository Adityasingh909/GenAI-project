const express = require("express");
const cookieParser = require("cookie-parser")
const dbconnection = require("./src/config/dbconnectio");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

const authroute = require("./src/routes/auth.route")

app.use(express.json());
app.use(cookieParser())
dbconnection();

app.use("/api/auth",authroute);


app.listen(PORT, (req, res) => {
  console.log(`Server running at port ${PORT}`);
});
