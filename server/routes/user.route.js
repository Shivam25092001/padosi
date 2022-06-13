import express from "express";
import {isUserAuthentic, authorizeRoles} from "../middleware/auth.js";
import {registerUser, Login, Logout, forgotpass, resetpass, getUserDetails, updatePassword, updateProfile, getUsers, getSingleUser, updateRole, deleteUser} from "../controllers/users.control.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", Login);
router.post("/password/forgot", forgotpass);
router.put("/password/reset/:token", resetpass);
router.get("/logout", Logout);
router.get("/me",isUserAuthentic , getUserDetails);
router.put("/password/update", isUserAuthentic, updatePassword);
router.put("/me/update", isUserAuthentic, updateProfile);
router.get("/admin/users",isUserAuthentic, authorizeRoles("admin"), getUsers);
router.get("/admin/users/:id", isUserAuthentic, authorizeRoles("admin"), getSingleUser);
router.put("/admin/users/:id", isUserAuthentic, authorizeRoles("admin"), updateRole);
router.delete("/admin/users/:id", isUserAuthentic, authorizeRoles("admin"), deleteUser);

export default router;