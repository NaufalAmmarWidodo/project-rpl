import { Router } from "express";
import {
  getAllPurchaseOrders,
  createPurchaseOrder,
  shipPurchaseOrder,
  receivePurchaseOrder,
} from "../controllers/purchase-order.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

// All PO endpoints require authentication
router.use(authenticate);

// Admin & Supplier list POs
router.get("/", authorize("ADMIN", "SUPPLIER"), getAllPurchaseOrders);

// Admin creates PO
router.post("/", authorize("ADMIN"), createPurchaseOrder);

// Supplier confirms & inputs tracking resi
router.patch("/:id/ship", authorize("SUPPLIER"), shipPurchaseOrder);

// Admin receives PO and auto-increments stock
router.patch("/:id/receive", authorize("ADMIN"), receivePurchaseOrder);

export default router;
