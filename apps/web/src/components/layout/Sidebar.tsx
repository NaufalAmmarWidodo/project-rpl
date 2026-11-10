import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Wrench,
  Package,
  Truck,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink,
  LucideIcon,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  badge?: string;
  badgeType?: "alert" | "success" | "info";
}

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Pesanan & Verifikasi", path: "/admin/pesanan", icon: ShoppingCart, badge: "8 Baru", badgeType: "alert" },
  { label: "Service Fotocopy", path: "/admin/service", icon: Wrench, badge: "3 Aktif", badgeType: "info" },
  { label: "Produk & Stok ATK", path: "/admin/produk-stok", icon: Package },
  { label: "Pengadaan PO Mitra", path: "/admin/pengadaan-po", icon: Truck, badge: "2 Baru", badgeType: "success" },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const adminName = user?.fullName || user?.nama || "Ahmad Dani";
  const adminRole = user?.jabatan || "Admin Operasional Toko";
  const adminAvatar = user?.avatarUrl;

  return (
    <aside
      className={cn(
        "bg-white rounded-[28px] p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-slate-200/70 flex flex-col justify-between shrink-0 transition-all duration-300",
        collapsed ? "w-20" : "w-full xl:w-64"
      )}
    >
      <div>
        {/* ================= REBRANDED HEADER SIDEBAR ================= */}
        <div className="flex items-center justify-between pb-6 pt-1 px-1 border-b border-slate-100">
          <Link to="/admin" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F97316] to-[#FB923C] flex items-center justify-center text-white font-black text-lg shadow-sm shrink-0">
              CI
            </div>
            {!collapsed && (
              <div className="truncate">
                <h1 className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight truncate">
                  FOTOCOPY CEMERLANG INDAH
                </h1>
                <p className="text-[10px] font-bold text-orange-600 tracking-wider uppercase truncate mt-0.5">
                  ADMIN WORKSPACE
                </p>
              </div>
            )}
          </Link>

          {/* Tombol Kecil Collapse / Toggle */}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-xl border border-slate-200 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition shrink-0 cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>

        {/* ================= NAVIGATION MENU LINKS ================= */}
        <nav className="mt-5 space-y-1.5">
          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/admin" && location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition group font-medium text-sm",
                  isActive
                    ? "bg-[#0F172A] text-white shadow-xs"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
                )}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={cn(
                      "shrink-0 transition",
                      isActive
                        ? "text-white"
                        : "text-slate-500 group-hover:text-slate-700"
                    )}
                  />
                  {!collapsed && (
                    <span className={isActive ? "text-white font-semibold" : "text-slate-700 font-medium"}>
                      {item.label}
                    </span>
                  )}
                </div>

                {!collapsed && item.badge && (
                  <span
                    className={cn(
                      "text-xs font-semibold px-2.5 py-0.5 rounded-full border transition",
                      isActive
                        ? "bg-white/20 text-white border-white/30"
                        : item.badgeType === "success"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200/50"
                        : item.badgeType === "alert"
                        ? "bg-rose-50 text-rose-600 border-rose-200/50"
                        : "bg-blue-50 text-blue-600 border-blue-200/50"
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

      {/* ================= SIDEBAR FOOTER: PROFILE & LOGOUT ================= */}
      <div className="pt-6 border-t border-slate-100 space-y-3">
        {!collapsed && (
          <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-3 flex items-center gap-3">
            {adminAvatar ? (
              <img
                src={adminAvatar}
                alt={adminName}
                className="w-9 h-9 rounded-full object-cover border border-white shadow-2xs shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                {adminName[0].toUpperCase()}
              </div>
            )}
            <div className="truncate flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">{adminName}</p>
              <p className="text-[10px] text-slate-400 font-semibold truncate">{adminRole}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          {!collapsed && (
            <Link
              to="/katalog"
              className="text-[11px] font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition"
              title="Buka Toko Storefront"
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
  );
};

export default Sidebar;
