import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// 1. Customer Portal Pages
import ProductCatalog from "./pages/customer/ProductCatalog";
import PrintServicePage from "./pages/customer/PrintServicePage";
import ServiceBookingPage from "./pages/customer/ServiceBookingPage";
import OrderHistoryPage from "./pages/customer/OrderHistoryPage";
import ServiceTicketPage from "./pages/customer/ServiceTicketPage";
import CheckoutPage from "./pages/customer/CheckoutPage";
import OrderTrackingPage from "./pages/customer/OrderTrackingPage";

// 2. Admin Portal Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminServicePage from "./pages/admin/AdminServicePage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminPurchaseOrderPage from "./pages/admin/AdminPurchaseOrderPage";

// 3. Supplier Portal Pages
import SupplierDashboard from "./pages/supplier/SupplierDashboard";
import SupplierPOPage from "./pages/supplier/SupplierPOPage";
import SupplierCatalogPage from "./pages/supplier/SupplierCatalogPage";
import SupplierInvoicesPage from "./pages/supplier/SupplierInvoicesPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ================= 1. PORTAL CUSTOMER ================= */}
          <Route path="/" element={<ProductCatalog />} />
          <Route path="/katalog" element={<ProductCatalog />} />
          <Route path="/produk" element={<Navigate to="/katalog" replace />} />
          <Route path="/cetak" element={<PrintServicePage />} />
          <Route path="/service" element={<ServiceBookingPage />} />
          <Route path="/pesanan" element={<OrderHistoryPage />} />
          <Route path="/tiket-service" element={<ServiceTicketPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/tracking/:orderId" element={<OrderTrackingPage />} />
          <Route path="/tracking" element={<OrderTrackingPage />} />

          {/* Customer Route Prefix Aliases */}
          <Route path="/customer" element={<Navigate to="/katalog" replace />} />
          <Route path="/customer/katalog" element={<Navigate to="/katalog" replace />} />
          <Route path="/customer/cetak" element={<Navigate to="/cetak" replace />} />
          <Route path="/customer/service" element={<Navigate to="/service" replace />} />
          <Route path="/customer/pesanan" element={<Navigate to="/pesanan" replace />} />

          {/* ================= 2. DASHBOARD ADMIN (PROTECTED) ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pesanan"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminOrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/service"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminServicePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/produk-stok"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pengadaan-po"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminPurchaseOrderPage />
              </ProtectedRoute>
            }
          />

          {/* ================= 3. DASHBOARD SUPPLIER (PROTECTED) ================= */}
          <Route
            path="/supplier"
            element={
              <ProtectedRoute allowedRoles={["SUPPLIER"]}>
                <SupplierDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier/overview"
            element={
              <ProtectedRoute allowedRoles={["SUPPLIER"]}>
                <SupplierDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier/po-masuk"
            element={
              <ProtectedRoute allowedRoles={["SUPPLIER"]}>
                <SupplierPOPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier/katalog-pasokan"
            element={
              <ProtectedRoute allowedRoles={["SUPPLIER"]}>
                <SupplierCatalogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier/faktur"
            element={
              <ProtectedRoute allowedRoles={["SUPPLIER"]}>
                <SupplierInvoicesPage />
              </ProtectedRoute>
            }
          />

          {/* ================= AUTHENTICATION ================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Fallback 404 */}
          <Route path="*" element={<Navigate to="/katalog" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
