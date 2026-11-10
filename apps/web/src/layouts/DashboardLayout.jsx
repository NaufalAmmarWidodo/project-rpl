import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  Bell,
  MessageSquare,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  roleTitle = "Admin Portal",
  navItems = [],
  headerTitle = "Dashboard",
  headerAction,
  user = {
    name: "Jane Cooper",
    role: "Admin Operasional",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  },
  rightWidget,
  children,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#E5E7EB] p-2 sm:p-4 lg:p-6 flex items-center justify-center font-sans antialiased text-gray-800">
      {/* Outer Floating Application Frame (Matching Gambar 1) */}
      <div className="w-full max-w-[1520px] bg-[#F4F5F7] rounded-[36px] shadow-2xl border border-white/80 p-3 sm:p-5 lg:p-6 flex flex-col xl:flex-row gap-5">
        
        {/* ================= SIDEBAR ================= */}
        <aside
          className={cn(
            "bg-white rounded-[28px] p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col justify-between shrink-0 transition-all duration-300",
            collapsed ? "w-20" : "w-full xl:w-64"
          )}
        >
          <div>
            {/* Brand Logo Header */}
            <div className="flex items-center justify-between pb-6 pt-1 px-1 border-b border-gray-100">
              <Link to="/" className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6B35] to-[#FFA07A] flex items-center justify-center text-white font-black text-lg shadow-sm shrink-0">
                  VK
                </div>
                {!collapsed && (
                  <div className="truncate">
                    <h1 className="text-base font-extrabold text-gray-900 tracking-tight leading-tight">
                      VYKINS
                    </h1>
                    <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase truncate">
                      {roleTitle}
                    </p>
                  </div>
                )}
              </Link>

              <button
                onClick={() => setCollapsed(!collapsed)}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition shrink-0"
                aria-label="Toggle Sidebar"
              >
                {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="mt-5 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={cn(
                      "flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition group",
                      isActive
                        ? "bg-gray-100 text-gray-900 font-bold shadow-2xs"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <div className="flex items-center gap-3.5">
                      <Icon
                        size={18}
                        className={cn(
                          "shrink-0 transition",
                          isActive ? "text-gray-900" : "text-gray-400 group-hover:text-gray-700"
                        )}
                      />
                      {!collapsed && <span>{item.label}</span>}
                    </div>

                    {!collapsed && item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="pt-6 border-t border-gray-100 space-y-3">
            <Link
              to="/login"
              className="flex items-center gap-3 px-3.5 py-2 text-xs font-semibold text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition"
              title="Keluar"
            >
              <LogOut size={16} />
              {!collapsed && <span>Keluar Akun</span>}
            </Link>

            {/* Theme Switcher Widget */}
            <div className="flex items-center justify-between pt-1">
              <button
                className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition"
                aria-label="Messages"
              >
                <MessageSquare size={17} />
              </button>

              <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200/60">
                <button
                  className="w-7 h-7 rounded-full text-gray-400 flex items-center justify-center hover:text-gray-700"
                  aria-label="Dark mode"
                >
                  <Moon size={13} />
                </button>
                <button
                  className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shadow-xs"
                  aria-label="Light mode"
                >
                  <Sun size={13} />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* ================= MAIN CONTENT AREA ================= */}
        <div className="flex-1 flex flex-col min-w-0 space-y-6">
          {/* Topbar */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                {headerTitle}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Inset Pill Search */}
              <div className="relative w-full sm:w-64">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari data..."
                  className="w-full bg-white border border-gray-200/80 rounded-full py-2.5 pl-11 pr-4 text-xs text-gray-800 placeholder-gray-400 outline-none shadow-2xs focus:border-gray-400 transition"
                />
              </div>

              {headerAction}

              <button
                aria-label="Notifikasi"
                className="w-10 h-10 rounded-full bg-white border border-gray-200/80 shadow-2xs flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition shrink-0"
              >
                <Bell size={17} />
              </button>

              <button
                aria-label="Pesan"
                className="w-10 h-10 rounded-full bg-white border border-gray-200/80 shadow-2xs flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition shrink-0"
              >
                <MessageSquare size={17} />
              </button>

              <div className="pl-1 shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-2xs"
                />
              </div>
            </div>
          </header>

          {/* Body Content */}
          <div className="flex-1 flex flex-col xl:flex-row gap-5">
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
