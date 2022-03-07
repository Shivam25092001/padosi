import express from "express";
import {registerUser, Login, Logout, forgotpass, resetpass} from "../controllers/users.control.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", Login);
router.post("/password/forgot", forgotpass);
router.put("/password/reset/:token", resetpass);
router.get("/logout", Logout);

export default router;