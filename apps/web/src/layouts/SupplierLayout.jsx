import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  TrendingUp,
  Inbox,
  Boxes,
  Receipt,
  Search,
  Bell,
  MessageSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Truck,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const SUPPLIER_NAV = [
  { label: "Overview Mitra", path: "/supplier", icon: TrendingUp },
  { label: "PO Masuk", path: "/supplier/po-masuk", icon: Inbox, badge: "2 Baru" },
  { label: "Katalog Pasokan", path: "/supplier/katalog-pasokan", icon: Boxes },
  { label: "Faktur & Tagihan", path: "/supplier/faktur", icon: Receipt },
];

export default function SupplierLayout({
  headerTitle = "Portal Mitra Pasokan",
  headerSubtitle = "Distribusi Bahan Baku & Logistik Fotocopy Cemerlang Indah",
  searchPlaceholder = "Cari nomor PO, item pasokan, atau resi...",
  searchValue = "",
  onSearchChange,
  headerAction,
  rightWidget,
  children,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const supplierName = user?.fullName || user?.nama || "PT Sinar Grafika Mitra Logistik";
  const supplierRole = user?.jabatan || "Mitra Supplier Resmi";

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-2 sm:p-4 lg:p-6 flex items-center justify-center font-sans antialiased text-slate-800">
      {/* Outer Floating Application Frame */}
      <div className="w-full max-w-[1520px] bg-[#F8FAFC] rounded-[36px] shadow-2xl border border-white/80 p-3 sm:p-5 lg:p-6 flex flex-col xl:flex-row gap-5">
        
        {/* ================= DEDICATED SUPPLIER SIDEBAR ================= */}
        <aside
          className={cn(
            "bg-white rounded-[28px] p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-slate-200/70 flex flex-col justify-between shrink-0 transition-all duration-300",
            collapsed ? "w-20" : "w-full xl:w-64"
          )}
        >
          <div>
            {/* Brand Logo Header */}
            <div className="flex items-center justify-between pb-6 pt-1 px-1 border-b border-slate-100">
              <Link to="/supplier" className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F97316] to-[#FB923C] flex items-center justify-center text-white font-black text-lg shadow-sm shrink-0">
                  CI
                </div>
                {!collapsed && (
                  <div className="truncate">
                    <h1 className="text-base font-extrabold text-slate-900 tracking-tight leading-tight">
                      CEMERLANG INDAH
                    </h1>
                    <p className="text-[10px] font-bold text-orange-600 tracking-wider uppercase truncate">
                      Portal Mitra Pasokan
                    </p>
                  </div>
                )}
              </Link>

              <button
                type="button"
                onClick={() => setCollapsed(!collapsed)}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition shrink-0 cursor-pointer"
                aria-label="Toggle Sidebar"
              >
                {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
            </div>

            {/* Navigation Menu Links */}
            <nav className="mt-5 space-y-1.5">
              {SUPPLIER_NAV.map((item) => {
                const Icon = item.icon;
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== "/supplier" && location.pathname.startsWith(item.path));

                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={cn(
                      "flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition group",
                      isActive
                        ? "bg-slate-900 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={17}
                        className={cn(
                          "shrink-0 transition",
                          isActive ? "text-white" : "text-slate-400 group-hover:text-slate-700"
                        )}
                      />
                      {!collapsed && <span>{item.label}</span>}
                    </div>

                    {!collapsed && item.badge && (
                      <span
                        className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer: Profile + Logout */}
          <div className="pt-6 border-t border-slate-100 space-y-3">
            {!collapsed && (
              <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xs shrink-0">
                  <Truck size={17} />
                </div>
                <div className="truncate flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{supplierName}</p>
                  <p className="text-[10px] text-slate-400 font-semibold truncate">{supplierRole}</p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              {!collapsed && (
                <Link
                  to="/katalog"
                  className="text-[11px] font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition"
                  title="Buka Toko Customer"
                >
                  <span>Storefront</span>
                  <ExternalLink size={12} />
                </Link>
              )}

              <button
                type="button"
                onClick={logout}
                className={cn(
                  "p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer flex items-center gap-1 text-xs font-semibold",
                  collapsed && "w-full justify-center"
                )}
                title="Keluar Akun"
              >
                <LogOut size={16} />
                {!collapsed && <span>Keluar</span>}
              </button>
            </div>
          </div>
        </aside>

        {/* ================= MAIN SUPPLIER WORKSPACE ================= */}
        <div className="flex-1 flex flex-col min-w-0 space-y-6">
          {/* Topbar */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {headerTitle}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Inset Pill Search */}
              <div className="relative w-full sm:w-64">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full bg-white border border-slate-200/80 rounded-full py-2.5 pl-11 pr-4 text-xs text-slate-800 placeholder-slate-400 outline-none shadow-2xs focus:border-slate-900 transition"
                />
              </div>

              {headerAction}

              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center text-slate-500 hover:text-slate-900 transition shrink-0"
                aria-label="Notifikasi"
              >
                <Bell size={17} />
              </button>

              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center text-slate-500 hover:text-slate-900 transition shrink-0"
                aria-label="Pesan Toko"
              >
                <MessageSquare size={17} />
              </button>

              {/* Avatar Pill Topbar */}
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-bold shrink-0">
                SG
              </div>
            </div>
          </header>

          {/* Body Content */}
          <div className="flex-1 flex flex-col xl:flex-row gap-5 min-w-0">
            <main className="flex-1 min-w-0 space-y-5">{children}</main>

            {rightWidget && (
              <aside className="w-full xl:w-80 shrink-0 space-y-5">
                {rightWidget}
              </aside>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
