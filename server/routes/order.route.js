import express from "express";
import { allOrders, deleteOrder, getOrderDetails, myOrders, newOrder, updateOrderStatus } from "../controllers/order.control.js";
import { authorizeRoles, isUserAuthentic } from "../middleware/auth.js";
const router = express.Router();

router.post("/order/new",isUserAuthentic, newOrder);
router.get("/order/:id", isUserAuthentic, getOrderDetails);
router.get("/orders/me",isUserAuthentic, myOrders);
router.get("/admin/orders", isUserAuthentic, authorizeRoles("admin"), allOrders);
router.put("/admin/order/:id", isUserAuthentic, authorizeRoles("admin"), updateOrderStatus);
router.delete("/admin/order/:id", isUserAuthentic, authorizeRoles("admin"), deleteOrder);


export default router;