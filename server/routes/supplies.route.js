import express from "express";
import {createSupply, createSupplyReview, deleteReview, deleteSupply, getDetails, getSupplies, getSupplyReviews, updateSupply} from "../controllers/supplies.control.js";
import {isUserAuthentic, authorizeRoles} from "../middleware/auth.js";

const router = express.Router();

router.get('/supplies',isUserAuthentic , authorizeRoles("admin"), getSupplies);
router.post('/supplies/new',isUserAuthentic, createSupply);
router.put('/supplies/:id',isUserAuthentic, updateSupply);
router.delete('/supplies/:id',isUserAuthentic, deleteSupply);
router.get('/supplies/:id', getDetails);
router.put("/review", isUserAuthentic, createSupplyReview);
router.get("/reviews", getSupplyReviews);
router.delete("/reviews", isUserAuthentic, deleteReview);

export default router;