import React, { useState } from "react";
import { Search, Bell, MessageSquare } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayout({
  headerTitle = "Dashboard Operasional",
  headerSubtitle = "Sistem Manajemen Fotocopy & Percetakan Terpadu",
  searchPlaceholder = "Cari pesanan, tiket service, atau SKU produk...",
  searchValue = "",
  onSearchChange,
  headerAction,
  rightWidget,
  children,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const adminName = user?.fullName || user?.nama || "Ahmad Dani";

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-2 sm:p-4 lg:p-6 flex items-center justify-center font-sans antialiased text-slate-800">
      {/* Outer Floating Application Frame (Matching Gambar 1 / Clean Slate) */}
      <div className="w-full max-w-[1520px] bg-[#F8FAFC] rounded-[36px] shadow-2xl border border-white/80 p-3 sm:p-5 lg:p-6 flex flex-col xl:flex-row gap-5">
        
        {/* ================= REBRANDED DEDICATED ADMIN SIDEBAR ================= */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* ================= MAIN ADMIN WORKSPACE ================= */}
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
                className="w-10 h-10 rounded-full bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center text-slate-500 hover:text-slate-900 transition shrink-0 cursor-pointer"
                aria-label="Notifikasi"
              >
                <Bell size={17} />
              </button>

              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center text-slate-500 hover:text-slate-900 transition shrink-0 cursor-pointer"
                aria-label="Pesan Helpdesk"
              >
                <MessageSquare size={17} />
              </button>

              {/* Avatar Pill Topbar */}
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                {adminName[0].toUpperCase()}
              </div>
            </div>
          </header>

          {/* Body Content Area */}
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
