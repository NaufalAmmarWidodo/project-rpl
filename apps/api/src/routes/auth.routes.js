import { Router } from "express";

import {
  register,
  login,
  logout,
  me,
  createUserByAdmin,
} from "../controllers/auth.controller.js";

import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.get("/me", authenticate, me);

// Endpoint Admin untuk membuat akun Admin atau Supplier baru
router.post("/users", authenticate, authorize("ADMIN"), createUserByAdmin);

export default router;