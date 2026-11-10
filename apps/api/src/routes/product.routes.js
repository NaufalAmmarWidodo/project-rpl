import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Protected routes (Admin only)
router.post("/", authenticate, authorize("ADMIN"), createProduct);
router.put("/:id", authenticate, authorize("ADMIN"), updateProduct);

export default router;
