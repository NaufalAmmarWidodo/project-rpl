import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="container-app flex h-20 items-center justify-between gap-5">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6B35] to-[#FFA07A] flex items-center justify-center text-white font-black text-lg shadow-sm">
            VK
          </div>
          <div>
            <h1 className="text-base font-extrabold text-gray-900 tracking-tight leading-tight">
              VYKINS
            </h1>
            <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
              Cemerlang Indah
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 text-xs font-bold text-gray-600 md:flex">
          <Link to="/" className="text-gray-900 hover:text-black">
            Beranda
          </Link>
          <Link to="/produk" className="hover:text-black transition">
            Katalog ATK
          </Link>
          <Link to="/cetak" className="hover:text-black transition">
            Layanan Cetak
          </Link>
          <Link to="/supplier" className="hover:text-black transition">
            Supplier Portal
          </Link>
          <Link to="/admin" className="hover:text-black transition">
            Dashboard
          </Link>
        </nav>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-3">
          <Link
            to="/produk"
            className="rounded-full p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
            aria-label="Pencarian"
          >
            <Search size={18} />
          </Link>

          <Link
            to="/produk"
            className="relative rounded-full p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
            aria-label="Keranjang Belanja"
          >
            <ShoppingCart size={18} />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
              2
            </span>
          </Link>

          {/* User Account / Login Button */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-gray-200 hover:border-slate-400 transition bg-white"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-800 font-bold text-xs flex items-center justify-center">
                  {user.fullName ? user.fullName[0].toUpperCase() : "U"}
                </div>
                <span className="text-xs font-semibold text-gray-800 hidden sm:inline max-w-[100px] truncate">
                  {user.fullName || user.email}
                </span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white shadow-xl border border-gray-100 py-2 z-50 text-xs">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-bold text-gray-800 truncate">{user.fullName}</p>
                    <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                    <span className="inline-block mt-1 text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-orange-50 text-[#FF6B35]">
                      {user.role}
                    </span>
                  </div>

                  {user.role === "ADMIN" && (
                    <Link
                      to="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-semibold"
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  {user.role === "SUPPLIER" && (
                    <Link
                      to="/supplier"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-semibold"
                    >
                      Portal Supplier
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-rose-600 hover:bg-rose-50 text-left font-semibold"
                  >
                    <LogOut size={14} /> Keluar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-black shadow-xs"
            >
              <User size={14} />
              <span>Masuk</span>
            </Link>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 hover:bg-gray-100 md:hidden text-gray-700"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white p-5 md:hidden space-y-3 text-xs font-bold">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-900"
          >
            Beranda
          </Link>
          <Link
            to="/produk"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-gray-900"
          >
            Katalog Produk
          </Link>
          <Link
            to="/cetak"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-gray-900"
          >
            Layanan Cetak
          </Link>
        </div>
      )}
    </header>
  );
}
