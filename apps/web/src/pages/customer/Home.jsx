import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  Package,
  ShoppingBag,
  Wallet,
  CreditCard,
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
  MoreHorizontal,
  Star,
  Smartphone,
  Laptop,
  CheckCircle2,
  TrendingUp,
  Plus,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Shop");
  const [search, setSearch] = useState("");

  const products = [
    {
      id: 1,
      name: "Kertas HVS A4 70 GSM",
      price: "Rp 55.000",
      rating: "5.0",
      category: "Kertas",
      image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600",
      tag: "Terlaris",
    },
    {
      id: 2,
      name: "Pulpen Standard AE7 (Box)",
      price: "Rp 42.000",
      rating: "5.0",
      category: "Alat Tulis",
      image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600",
      tag: "Populer",
    },
    {
      id: 3,
      name: "Jasa Jilid Skripsi & Dokumen",
      price: "Rp 15.000",
      rating: "5.0",
      category: "Percetakan",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600",
      tag: "Layanan",
    },
    {
      id: 4,
      name: "Toner Mesin Fotocopy NPG-51",
      price: "Rp 450.000",
      rating: "5.0",
      category: "Sparepart",
      image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600",
      tag: "Service",
    },
  ];

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
              <button
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition"
                aria-label="Sidebar Collapse"
              >
                <div className="w-3.5 h-3.5 border-2 border-gray-400 rounded-xs" />
              </button>
            </div>

            {/* Navigation Menu */}
            <nav className="mt-5 space-y-1">
              <Link
                to="/admin"
                className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition"
              >
                <LayoutGrid size={18} className="text-gray-400" />
                <span>Dashboard</span>
              </Link>

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

              <Link
                to="/produk"
                className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition"
              >
                <Package size={18} className="text-gray-400" />
                <span>Products</span>
              </Link>

              {/* Active Menu: Shop (with pill style & eye indicator matching reference image) */}
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-gray-100 text-gray-900 text-xs font-bold shadow-2xs">
                <div className="flex items-center gap-3.5">
                  <ShoppingBag size={18} className="text-gray-900" />
                  <span>Shop</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Eye size={14} />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                </div>
              </div>

              <Link
                to="/cetak"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3.5">
                  <Wallet size={18} className="text-gray-400" />
                  <span>Layanan Cetak</span>
                </div>
                <ChevronDown size={14} className="text-gray-400" />
              </Link>

              <Link
                to="/supplier"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3.5">
                  <CreditCard size={18} className="text-gray-400" />
                  <span>Supplier Portal</span>
                </div>
                <ChevronDown size={14} className="text-gray-400" />
              </Link>

              <Link
                to="/admin"
                className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition"
              >
                <BarChart3 size={18} className="text-gray-400" />
                <span>Analytic</span>
              </Link>
            </nav>

            <div className="my-4 border-t border-gray-100" />

            {/* Bottom Support & Settings */}
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
          {/* Topbar: Shop Title + Inset Search + Create Button + Profile */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Shop
            </h2>

            <div className="flex items-center gap-3">
              {/* Inset Pill Search Input (Matches Reference Image) */}
              <div className="relative w-full sm:w-64">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search anything..."
                  className="w-full bg-white border border-gray-200/80 rounded-full py-2.5 pl-11 pr-4 text-xs text-gray-800 placeholder-gray-400 outline-none shadow-2xs focus:border-gray-400 transition"
                />
              </div>

              {/* Dark Pill "Create" Button */}
              <Link
                to="/produk"
                className="bg-[#1E2024] hover:bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-2xs transition shrink-0"
              >
                Create
              </Link>

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

          {/* Metric Banner: 3 Metric Cards in a Row (Matches Reference Image) */}
          <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-100 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 gap-4 md:gap-0">
            {/* Metric 1 */}
            <div className="flex flex-col items-center justify-center text-center px-4 py-2">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-2">
                <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-gray-600">
                  ↑
                </div>
                <span>Total Product</span>
              </div>
              <p className="text-3xl font-black text-gray-900 tracking-tight">
                2,240
              </p>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col items-center justify-center text-center px-4 py-2">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-2">
                <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-gray-600">
                  $
                </div>
                <span>Total Revenue</span>
              </div>
              <p className="text-3xl font-black text-gray-900 tracking-tight">
                $10,245
              </p>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col items-center justify-center text-center px-4 py-2">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-2">
                <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-gray-600">
                  ★
                </div>
                <span>Highest Performer</span>
              </div>
              <p className="text-3xl font-black text-gray-900 tracking-tight">
                500
              </p>
            </div>
          </div>

          {/* Products Section (Header + 2x2 Colorful Grid) */}
          <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-100 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">Products</h3>
              <Link
                to="/produk"
                className="text-xs font-semibold text-gray-500 hover:text-gray-900 px-4 py-1.5 rounded-full border border-gray-200/80 hover:bg-gray-50 transition"
              >
                View all
              </Link>
            </div>

            {/* 2x2 Grid of Cards (Matches the Colorful Cards in the Image) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[22px] border border-gray-100 bg-[#FAFAFA] p-3 flex flex-col justify-between hover:shadow-lg transition-all group"
                >
                  <div className="w-full h-44 rounded-[18px] overflow-hidden bg-gray-100 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  </div>

                  <div className="pt-3 px-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                        {item.name}
                      </h4>
                      <span className="text-xs font-black text-gray-900 shrink-0">
                        {item.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-2">
                      <span className="flex items-center gap-1 font-semibold text-gray-700">
                        <Star size={13} className="text-amber-400 fill-amber-400" />
                        {item.rating}
                      </span>
                      <span>•</span>
                      <span>{item.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* ================= RIGHT WIDGET ASIDE ================= */}
        <aside className="w-full xl:w-80 shrink-0 space-y-5">
          {/* Top Product Revenue Widget with Smooth Line Chart */}
          <div className="bg-white rounded-[28px] p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-900">
                Top Product Revenue
              </h3>
              <button
                className="text-gray-400 hover:text-gray-700"
                aria-label="Options"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="text-center my-4">
              <p className="text-[11px] font-semibold text-gray-400">23 Sep</p>
              <h4 className="text-3xl font-black text-gray-900 tracking-tight mt-0.5">
                $70,180
              </h4>
              <span className="inline-block mt-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                +5% higher than yesterday
              </span>
            </div>

            {/* Smooth Multi-line Bezier Chart (Matching Image) */}
            <div className="relative my-3 pt-2">
              <svg viewBox="0 0 280 120" className="w-full h-28 overflow-visible">
                {/* Grid guidelines */}
                <line x1="0" y1="20" x2="280" y2="20" stroke="#F3F4F6" strokeDasharray="3 3" />
                <line x1="0" y1="60" x2="280" y2="60" stroke="#F3F4F6" strokeDasharray="3 3" />
                <line x1="0" y1="100" x2="280" y2="100" stroke="#F3F4F6" strokeDasharray="3 3" />

                {/* Orange Curve */}
                <path
                  d="M 10 90 C 50 110, 80 40, 130 75 C 180 110, 220 20, 270 30"
                  fill="none"
                  stroke="#FF6B35"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Sky Blue Curve */}
                <path
                  d="M 10 70 C 60 40, 100 80, 150 50 C 200 20, 230 60, 270 20"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Soft Orange / Yellow Curve */}
                <path
                  d="M 10 105 C 70 95, 110 65, 160 85 C 210 105, 240 65, 270 45"
                  fill="none"
                  stroke="#FBBF24"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Tooltip dot & card for Sunday */}
                <circle cx="270" cy="30" r="4" fill="#FF6B35" />
              </svg>

              {/* Tooltip pill matching reference image */}
              <div className="absolute top-0 right-0 bg-[#1E2024] text-white text-[9px] font-bold px-2.5 py-1 rounded-lg shadow-md pointer-events-none">
                Sunday <br />
                <span className="font-extrabold text-amber-300">$70,180</span>
              </div>

              {/* Day Labels */}
              <div className="flex justify-between text-[10px] text-gray-400 font-semibold px-2 mt-1">
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
                <span>Su</span>
              </div>
            </div>

            {/* Category Breakdown List */}
            <div className="mt-4 pt-3 border-t border-gray-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-gray-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]" /> ATK & Kertas
                </span>
                <span className="font-bold text-gray-900">$40,165</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-gray-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" /> Percetakan & Jilid
                </span>
                <span className="font-bold text-gray-900">$20,466</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-gray-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]" /> Servis Mesin
                </span>
                <span className="font-bold text-gray-900">$10,245</span>
              </div>
            </div>
          </div>

          {/* Monthly Target Gauge Widget (Semi-Circle Arc matching reference image) */}
          <div className="bg-white rounded-[28px] p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-gray-900">Monthly Target</h3>
              <button
                className="text-gray-400 hover:text-gray-700"
                aria-label="Options"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center pt-2">
              {/* Semi-circle Gauge */}
              <div className="relative w-44 h-24 overflow-hidden flex items-end justify-center">
                <svg viewBox="0 0 160 90" className="w-44 h-24">
                  {/* Background Arc */}
                  <path
                    d="M 20 80 A 60 60 0 0 1 140 80"
                    fill="none"
                    stroke="#F3F4F6"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                  {/* Value Arc (Orange ~82%) */}
                  <path
                    d="M 20 80 A 60 60 0 0 1 125 40"
                    fill="none"
                    stroke="#FF6B35"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="text-center -mt-6">
                <p className="text-2xl font-black text-gray-900">82%</p>
                <p className="text-[10px] text-emerald-600 font-bold mt-0.5">
                  +5% than last month
                </p>
              </div>
            </div>

            {/* Top Performer Card */}
            <div className="mt-5 pt-3 border-t border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Top Performer
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120"
                    alt="Jane Cooper"
                    className="w-9 h-9 rounded-full object-cover border border-gray-100"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-gray-900">
                      Jane Cooper
                    </h5>
                    <p className="text-[10px] text-gray-400">Target: 2,000pts</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-black text-gray-900">1545pts</p>
                  <p className="text-[10px] font-bold text-emerald-600">+$50</p>
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[11px] font-bold text-amber-600 bg-amber-50/80 px-3 py-1 rounded-xl">
                <span>⭐ Gold Badge</span>
                <span>Active</span>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
