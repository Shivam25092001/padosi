import express from "express";
import {registerUser, Login, Logout} from "../controllers/users.control.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", Login);
router.get("/logout", Logout);

export default router;