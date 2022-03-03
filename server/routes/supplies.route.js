import express from "express";
import {createSupply, deleteSupply, getDetails, getSupplies, updateSupply} from "../controllers/supplies.control.js";

const router = express.Router();

router.get('/supplies', getSupplies);
router.post('/supplies/new', createSupply);
router.put('/supplies/:id', updateSupply);
router.delete('/supplies/:id', deleteSupply);
router.get('/supplies/:id', getDetails);

export default router;