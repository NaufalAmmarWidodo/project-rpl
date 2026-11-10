import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  Package,
  ShoppingBag,
  Printer,
  Truck,
  BarChart3,
  Headphones,
  Settings,
  Search,
  Bell,
  MessageSquare,
  Sun,
  Moon,
  ChevronDown,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AppLayout({
  headerTitle = "Shop",
  activeMenu,
  searchPlaceholder = "Search anything...",
  searchValue = "",
  onSearchChange,
  headerAction,
  rightWidget,
  children,
}) {
  const location = useLocation();

  // Determine active item based on prop or current path
  const currentPath = location.pathname;
  const currentMenu =
    activeMenu ||
    (currentPath === "/"
      ? "Shop"
      : currentPath.startsWith("/produk")
      ? "Products"
      : currentPath.startsWith("/cetak")
      ? "Layanan Cetak"
      : currentPath.startsWith("/supplier")
      ? "Supplier Portal"
      : currentPath.startsWith("/admin")
      ? "Dashboard"
      : "Shop");

  return (
    <div className="min-h-screen bg-[#E5E7EB] p-2 sm:p-4 lg:p-6 flex items-center justify-center font-sans antialiased text-gray-800">
      {/* Outer Floating Application Frame (Matching the Reference Image) */}
      <div className="w-full max-w-[1520px] bg-[#F4F5F7] rounded-[36px] shadow-2xl border border-white/80 p-3 sm:p-5 lg:p-6 flex flex-col xl:flex-row gap-5">
        
        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="w-full xl:w-64 bg-white rounded-[28px] p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-100/90 flex flex-col justify-between shrink-0">
          <div>
            {/* Brand Logo Header */}
            <div className="flex items-center justify-between pb-6 pt-1 px-2 border-b border-gray-100">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F97316] to-[#FB923C] flex items-center justify-center text-white font-black text-lg shadow-sm">
                  CI
                </div>
                <div>
                  <h1 className="text-base font-extrabold text-gray-900 tracking-tight leading-tight">
                    FOTOCOPY CEMERLANG INDAH
                  </h1>
                  <p className="text-[10px] font-bold text-orange-600 tracking-wider uppercase">
                    Cemerlang Indah
                  </p>
                </div>
              </Link>
              <button
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition"
                aria-label="Sidebar Collapse"
              >
                <div className="w-3.5 h-3.5 border-2 border-gray-400 rounded-xs" />
              </button>
            </div>

            {/* Navigation Menu */}
            <nav className="mt-5 space-y-1">
              {/* 1. Dashboard */}
              <Link
                to="/admin"
                className={cn(
                  "flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition",
                  currentMenu === "Dashboard"
                    ? "bg-gray-100 text-gray-900 font-bold shadow-2xs"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <LayoutGrid size={18} className={currentMenu === "Dashboard" ? "text-gray-900" : "text-gray-400"} />
                <span>Dashboard</span>
              </Link>

              {/* 2. Customers */}
              <button
                type="button"
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3.5">
                  <Users size={18} className="text-gray-400" />
                  <span>Customers</span>
                </div>
                <ChevronDown size={14} className="text-gray-400" />
              </button>

              {/* 3. Products */}
              <Link
                to="/produk"
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition",
                  currentMenu === "Products"
                    ? "bg-gray-100 text-gray-900 font-bold shadow-2xs"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-3.5">
                  <Package size={18} className={currentMenu === "Products" ? "text-gray-900" : "text-gray-400"} />
                  <span>Products</span>
                </div>
                {currentMenu === "Products" && (
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Eye size={14} />
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                  </div>
                )}
              </Link>

              {/* 4. Shop */}
              <Link
                to="/"
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition",
                  currentMenu === "Shop"
                    ? "bg-gray-100 text-gray-900 font-bold shadow-2xs"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-3.5">
                  <ShoppingBag size={18} className={currentMenu === "Shop" ? "text-gray-900" : "text-gray-400"} />
                  <span>Shop</span>
                </div>
                {currentMenu === "Shop" && (
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Eye size={14} />
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                  </div>
                )}
              </Link>

              {/* 5. Layanan Cetak */}
              <Link
                to="/cetak"
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition",
                  currentMenu === "Layanan Cetak"
                    ? "bg-gray-100 text-gray-900 font-bold shadow-2xs"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-3.5">
                  <Printer size={18} className={currentMenu === "Layanan Cetak" ? "text-gray-900" : "text-gray-400"} />
                  <span>Layanan Cetak</span>
                </div>
                {currentMenu === "Layanan Cetak" && (
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Eye size={14} />
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                  </div>
                )}
              </Link>

              {/* 6. Supplier Portal */}
              <Link
                to="/supplier"
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition",
                  currentMenu === "Supplier Portal"
                    ? "bg-gray-100 text-gray-900 font-bold shadow-2xs"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-3.5">
                  <Truck size={18} className={currentMenu === "Supplier Portal" ? "text-gray-900" : "text-gray-400"} />
                  <span>Supplier Portal</span>
                </div>
                {currentMenu === "Supplier Portal" && (
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Eye size={14} />
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                  </div>
                )}
              </Link>

              {/* 7. Analytic */}
              <Link
                to="/admin"
                className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition"
              >
                <BarChart3 size={18} className="text-gray-400" />
                <span>Analytic</span>
              </Link>
            </nav>

            <div className="my-4 border-t border-gray-100" />

            {/* Support & Settings */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-gray-500 hover:bg-gray-50 transition cursor-pointer">
                <div className="flex items-center gap-3.5">
                  <Headphones size={18} className="text-gray-400" />
                  <span>Support</span>
                </div>
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-bold flex items-center justify-center">
                  2
                </span>
              </div>

              <Link
                to="/admin"
                className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-gray-500 hover:bg-gray-50 transition"
              >
                <Settings size={18} className="text-gray-400" />
                <span>Setting</span>
              </Link>
            </div>
          </div>

          {/* Sidebar Footer: Message Icon + Theme Switcher Pill */}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <button
              className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition"
              aria-label="Messages"
            >
              <MessageSquare size={18} />
            </button>

            <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200/60">
              <button
                className="w-7 h-7 rounded-full text-gray-400 flex items-center justify-center hover:text-gray-700"
                aria-label="Dark mode"
              >
                <Moon size={14} />
              </button>
              <button
                className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shadow-xs"
                aria-label="Light mode"
              >
                <Sun size={14} />
              </button>
            </div>
          </div>
        </aside>

        {/* ================= CENTER MAIN AREA ================= */}
        <main className="flex-1 flex flex-col min-w-0 space-y-6">
          {/* Topbar: Title + Inset Search + Action + Profile */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              {headerTitle}
            </h2>

            <div className="flex items-center gap-3">
              {/* Inset Pill Search Input */}
              <div className="relative w-full sm:w-64">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full bg-white border border-gray-200/80 rounded-full py-2.5 pl-11 pr-4 text-xs text-gray-800 placeholder-gray-400 outline-none shadow-2xs focus:border-gray-400 transition"
                />
              </div>

              {/* Action Button (e.g. Dark Pill Create Button) */}
              {headerAction}

              {/* Icon Buttons */}
              <button
                className="w-10 h-10 rounded-full bg-white border border-gray-200/80 shadow-2xs flex items-center justify-center text-gray-500 hover:text-gray-900 transition shrink-0"
                aria-label="Notification"
              >
                <Bell size={17} />
              </button>

              <button
                className="w-10 h-10 rounded-full bg-white border border-gray-200/80 shadow-2xs flex items-center justify-center text-gray-500 hover:text-gray-900 transition shrink-0"
                aria-label="Chat"
              >
                <MessageSquare size={17} />
              </button>

              {/* User Avatar Circle */}
              <Link to="/login" className="pl-1 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                  alt="User Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-2xs"
                />
              </Link>
            </div>
          </header>

          {/* Children Content */}
          <div className="flex-1 flex flex-col">{children}</div>
        </main>

        {/* ================= RIGHT WIDGET ASIDE (OPTIONAL) ================= */}
        {rightWidget && (
          <aside className="w-full xl:w-80 shrink-0 space-y-5">
            {rightWidget}
          </aside>
        )}

      </div>
    </div>
  );
}
