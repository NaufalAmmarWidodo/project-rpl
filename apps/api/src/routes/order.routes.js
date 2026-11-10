import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  uploadPaymentProof,
} from "../controllers/order.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

// All order endpoints require authentication
router.use(authenticate);

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.patch("/:id/status", authorize("ADMIN"), updateOrderStatus);
router.post("/:id/payment-proof", upload.single("paymentProof"), uploadPaymentProof);

export default router;
