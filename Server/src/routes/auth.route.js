const express = require("express");
const { register ,login, logout,getMeController} = require("../controller/auth.controller");
const {authUser}= require("../middleware/auth.middleware")
const router = express.Router()
// console.log("authmiddleware:", typeof authmiddleware);

router.post("/register",register);
router.post("/login",login)
router.get("/logout",logout)
router.get("/get-me",authUser,getMeController)

module.exports  = router;