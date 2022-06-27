import express from "express";
import {createSupply, createSupplyReview, deleteReview, deleteSupply, getDetails, getSupplies, getSupplyReviews, mySupplies, updateSupply} from "../controllers/supplies.control.js";
import {isUserAuthentic, authorizeRoles} from "../middleware/auth.js";

const router = express.Router();

router.get('/supplies', getSupplies);
router.post('/supplies/new',isUserAuthentic, createSupply);
router.put('/supplies/:id',isUserAuthentic, updateSupply);
router.get('/supplies/me', isUserAuthentic, mySupplies);
router.delete('/supplies/:id',isUserAuthentic,authorizeRoles("admin") ,deleteSupply);
router.get('/supplies/:id', getDetails);
router.put("/review", isUserAuthentic, createSupplyReview);
router.get("/reviews", getSupplyReviews);
router.delete("/reviews", isUserAuthentic, deleteReview);

export default router;