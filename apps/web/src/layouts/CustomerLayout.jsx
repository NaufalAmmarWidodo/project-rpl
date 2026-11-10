import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Package,
  Printer,
  Wrench,
  ShoppingBag,
  Clock,
  Search,
  ShoppingCart,
  LogOut,
  ChevronDown,
  User,
  Shield,
  Truck,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

const CUSTOMER_NAV = [
  { label: "Katalog ATK", path: "/katalog", altPath: "/", icon: Package },
  { label: "Layanan Cetak", path: "/cetak", icon: Printer },
  { label: "Service Fotocopy", path: "/service", icon: Wrench },
  { label: "Pesanan Saya", path: "/pesanan", icon: ShoppingBag },
  { label: "Tiket Service", path: "/tiket-service", icon: Clock },
];

export default function CustomerLayout({
  headerTitle = "Katalog Produk & Layanan",
  searchPlaceholder = "Cari produk ATK, kertas, tipe cetak, atau suku cadang...",
  searchValue = "",
  onSearchChange,
  cartCount,
  rightWidget,
  children,
}) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { cartItemCount } = useCart();
  const [profileOpen, setProfileOpen] = useState(false);

  const effectiveCartCount =
    typeof cartCount === "number" ? cartCount : cartItemCount;

  const customerName = user?.fullName || user?.nama || "Pelanggan";
  const customerEmail = user?.email || "customer@gmail.com";
  const customerRole = user?.role || "CUSTOMER";

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-2 sm:p-4 lg:p-6 flex items-center justify-center font-sans antialiased text-slate-800">
      {/* Outer Floating Application Frame (Matching Gambar 1 / Vykins Reference) */}
      <div className="w-full max-w-[1520px] bg-[#F8FAFC] rounded-[36px] shadow-2xl border border-white/80 p-3 sm:p-5 lg:p-6 flex flex-col gap-5">
        
        {/* ================= TOP CUSTOMER HEADER ================= */}
        <header className="bg-white rounded-[26px] p-4 sm:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-slate-200/70 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Brand Logo & Tag */}
          <div className="flex items-center justify-between">
            <Link to="/katalog" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F97316] to-[#FB923C] flex items-center justify-center text-white font-black text-lg shadow-sm">
                CI
              </div>
              <div>
                <h1 className="text-base font-extrabold text-slate-900 tracking-tight leading-tight">
                  FOTOCOPY CEMERLANG INDAH
                </h1>
                <p className="text-[10px] font-bold text-orange-600 tracking-wider uppercase">
                  Portal Storefront
                </p>
              </div>
            </Link>

            {/* Mobile Cart Shortcut */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                to="/checkout"
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 py-2 rounded-full inline-flex items-center gap-2 text-xs shadow-sm transition-colors"
              >
                <ShoppingCart size={16} className="w-4 h-4 text-white shrink-0" />
                <span className="text-white font-medium">({effectiveCartCount})</span>
              </Link>
            </div>
          </div>

          {/* Navigation Menu Pills */}
          <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {CUSTOMER_NAV.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                (item.altPath && location.pathname === item.altPath);

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={cn(
                    "rounded-full text-xs transition-colors whitespace-nowrap",
                    isActive
                      ? "bg-slate-900 text-white font-medium px-4 py-2 inline-flex items-center gap-2 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-2 inline-flex items-center gap-2 font-medium"
                  )}
                >
                  <Icon
                    size={16}
                    className={cn(
                      "w-4 h-4 shrink-0",
                      isActive ? "text-white" : "text-slate-500"
                    )}
                  />
                  <span className={isActive ? "text-white font-medium" : ""}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Input Inset */}
            <div className="relative w-full sm:w-60">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-[#F8FAFC] border border-slate-200/80 rounded-full py-2 pl-10 pr-3.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-slate-900 transition"
              />
            </div>

            {/* Desktop Cart Button */}
            <Link
              to="/checkout"
              className="hidden lg:inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 py-2 rounded-full text-xs shadow-sm transition-colors active:scale-95"
            >
              <ShoppingCart size={16} className="w-4 h-4 text-white shrink-0" />
              <span className="text-white font-medium">Keranjang ({effectiveCartCount})</span>
            </Link>

            {/* Profile Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full border border-slate-200/80 hover:bg-slate-50 transition cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                    {customerName[0].toUpperCase()}
                  </div>
                  <ChevronDown size={13} className="text-slate-400 mr-1" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 text-xs">
                    <div className="p-2.5 border-b border-slate-100">
                      <p className="font-bold text-slate-900 truncate">{customerName}</p>
                      <p className="text-[10px] text-slate-400 truncate">{customerEmail}</p>
                      <span className="inline-block mt-1 text-[9px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                        {customerRole}
                      </span>
                    </div>

                    <Link
                      to="/pesanan"
                      onClick={() => setProfileOpen(false)}
                      className="block px-3 py-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 mt-1"
                    >
                      Riwayat Pesanan
                    </Link>

                    <Link
                      to="/tiket-service"
                      onClick={() => setProfileOpen(false)}
                      className="block px-3 py-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700"
                    >
                      Status Tiket Service
                    </Link>

                    {customerRole === "ADMIN" && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 font-bold text-slate-900 border-t border-slate-100 mt-1"
                      >
                        <Shield size={13} className="text-orange-500" />
                        <span>Buka Admin Portal</span>
                      </Link>
                    )}

                    {customerRole === "SUPPLIER" && (
                      <Link
                        to="/supplier"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 font-bold text-slate-900 border-t border-slate-100 mt-1"
                      >
                        <Truck size={13} className="text-blue-500" />
                        <span>Buka Supplier Portal</span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-600 font-bold flex items-center gap-2 mt-1 cursor-pointer"
                    >
                      <LogOut size={13} /> Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-300 hover:border-slate-900 text-xs font-bold text-slate-700 transition"
              >
                <User size={13} />
                <span>Masuk</span>
              </Link>
            )}
          </div>
        </header>

        {/* ================= BODY CONTENT AREA ================= */}
        <div className="flex-1 flex flex-col xl:flex-row gap-5 min-w-0">
          <main className="flex-1 min-w-0 space-y-6">
            {children}
          </main>

          {/* Optional Right Panel */}
          {rightWidget && (
            <aside className="w-full xl:w-80 shrink-0 space-y-5">
              {rightWidget}
            </aside>
          )}
        </div>

      </div>
    </div>
  );
}
