import { Router } from "express";
import {
  getServiceTypes,
  getServiceTickets,
  createServiceTicket,
  updateServiceTicket,
} from "../controllers/service.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

// Public: get service types
router.get("/types", getServiceTypes);

// Authenticated: ticket management
router.use(authenticate);
router.get("/tickets", getServiceTickets);
router.post("/tickets", createServiceTicket);
router.patch("/tickets/:id", authorize("ADMIN"), updateServiceTicket);

export default router;
