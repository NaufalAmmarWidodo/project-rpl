import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// Route Handlers
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import purchaseOrderRoutes from "./routes/purchase-order.routes.js";
import serviceRoutes from "./routes/service.routes.js";

// Middlewares
import { notFoundHandler, errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static file uploads directory
app.use("/uploads", express.static("uploads"));

// Health check endpoint
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "API Fotocopy Cemerlang Indah berjalan!",
    version: "1.0.0",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);
app.use("/api/services", serviceRoutes);

// 404 & Centralized Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
