import express from "express";
import {createSupply, deleteSupply, getDetails, getSupplies, updateSupply} from "../controllers/supplies.control.js";
import {isUserAuthentic, authorizeRoles} from "../middleware/auth.js";

const router = express.Router();

router.get('/supplies',isUserAuthentic , authorizeRoles("admin"), getSupplies);
router.post('/supplies/new',isUserAuthentic, createSupply);
router.put('/supplies/:id',isUserAuthentic, updateSupply);
router.delete('/supplies/:id',isUserAuthentic, deleteSupply);
router.get('/supplies/:id', getDetails);

export default router;