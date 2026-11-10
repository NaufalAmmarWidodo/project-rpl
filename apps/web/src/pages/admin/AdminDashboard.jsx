import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import MetricCard from "@/components/common/MetricCard";
import StatusBadge from "@/components/common/StatusBadge";
import {
  DollarSign,
  Printer,
  Wrench,
  AlertTriangle,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";

const RECENT_ACTIVITIES = [
  {
    id: "ORD-9022",
    title: "Pesanan Masuk (ATK + Jilid)",
    time: "10 menit lalu",
    amount: "Rp 247.000",
    status: "PROCESSING",
  },
  {
    id: "SRV-2026-081",
    title: "Panggilan Servis Canon IR-3245",
    time: "35 menit lalu",
    amount: "Rp 185.000",
    status: "PROCESSING",
  },
  {
    id: "PO-2026-044",
    title: "Restock PO Dikirim ke Sinar Grafika",
    time: "2 jam lalu",
    amount: "Rp 4.250.000",
    status: "COMPLETED",
  },
];

export default function AdminDashboard() {
  const rightWidgetContent = (
    <div className="space-y-5">
      {/* 1. Target Penjualan Harian */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-slate-200/70">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Target Omset Toko</h3>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            Tercapai 88%
          </span>
        </div>

        <div className="my-4 text-center">
          <p className="text-3xl font-black text-slate-900 tracking-tight">Rp 14.850.000</p>
          <p className="text-[11px] text-slate-400 mt-1">Target Harian: Rp 16.500.000</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div className="bg-[#F97316] h-full rounded-full transition-all" style={{ width: "88%" }} />
        </div>
      </div>

      {/* 2. Tindakan Cepat (Quick Dispatch) */}
      <div className="bg-slate-900 text-white rounded-[28px] p-6 shadow-sm space-y-3">
        <span className="text-[10px] font-bold tracking-wider uppercase text-orange-400">
          Aksi Cepat Operasional
        </span>
        <h4 className="font-bold text-sm">Validasi Pesanan & Disposisi</h4>
        <div className="space-y-2 pt-2 text-xs">
          <Link
            to="/admin/pesanan"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
          >
            <span>Periksa Bukti Bayar (8)</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            to="/admin/service"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
          >
            <span>Tugaskan Teknisi Servis (3)</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            to="/admin/pengadaan-po"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
          >
            <span>Kirim Restock PO Supplier</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout
      headerTitle="Dashboard Operasional Admin"
      rightWidget={rightWidgetContent}
      headerAction={
        <Link
          to="/admin/pesanan"
          className="bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <ShoppingCart size={14} />
          <span>8 Pesanan Menunggu</span>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={DollarSign}
            label="Total Penjualan Harian"
            value="Rp 14.850.000"
            change="+12% dari kemarin"
            isPositive={true}
          />
          <MetricCard
            icon={Printer}
            label="Antrean Cetak Hari Ini"
            value="18 Berkas"
            change="6 jilid hardcover"
            isPositive={true}
          />
          <MetricCard
            icon={Wrench}
            label="Tiket Service Aktif"
            value="3 Unit Fotocopy"
            change="1 teknisi menuju lokasi"
            isPositive={true}
          />
          <MetricCard
            icon={AlertTriangle}
            label="Peringatan Stok Kritis"
            value="2 Item < Min"
            change="Perlu PO Supplier"
            isPositive={false}
          />
        </div>

        {/* Breakdown Grafik Pendapatan Mingguan */}
        <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Ringkasan Pendapatan Mingguan</h3>
              <p className="text-xs text-slate-400">Total akumulasi penjualan retail ATK, percetakan digital, dan servis mesin</p>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
              03 Nov - 09 Nov 2026
            </span>
          </div>

          {/* SVG Multi-Line Chart */}
          <div className="pt-6 pb-2">
            <svg viewBox="0 0 700 160" className="w-full h-40 overflow-visible">
              <line x1="0" y1="30" x2="700" y2="30" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="80" x2="700" y2="80" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="130" x2="700" y2="130" stroke="#F1F5F9" strokeWidth="1" />

              {/* Curve Penjualan ATK (Charcoal) */}
              <path
                d="M 20 110 Q 120 40 230 70 T 450 35 T 680 25"
                fill="none"
                stroke="#0F172A"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Curve Jasa Cetak (Orange Accent) */}
              <path
                d="M 20 135 Q 120 90 230 110 T 450 65 T 680 50"
                fill="none"
                stroke="#F97316"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
            </svg>

            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 px-4 pt-2">
              <span>Senin</span>
              <span>Selasa</span>
              <span>Rabu</span>
              <span>Kamis</span>
              <span>Jumat</span>
              <span>Sabtu</span>
              <span>Minggu</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs font-bold">
            <div className="flex items-center gap-2 text-slate-800">
              <span className="w-3 h-3 rounded-full bg-slate-900" />
              <span>Penjualan Retail ATK & Kertas (Rp 8.450.000)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-800">
              <span className="w-3 h-3 rounded-full bg-[#F97316]" />
              <span>Jasa Percetakan & Fotocopy (Rp 4.900.000)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-800">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span>Servis Mesin & Suku Cadang (Rp 1.500.000)</span>
            </div>
          </div>
        </div>

        {/* Aktivitas Terkini */}
        <div className="bg-white rounded-[28px] p-6 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-slate-900 text-base">Aktivitas Transaksi Terbaru</h3>
            <Link to="/admin/pesanan" className="text-xs font-bold text-orange-600 hover:underline">
              Kelola Semua Pesanan →
            </Link>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {RECENT_ACTIVITIES.map((act) => (
              <div key={act.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{act.id}</span>
                    <StatusBadge status={act.status} />
                  </div>
                  <p className="text-slate-500 mt-0.5">{act.title}</p>
                </div>
                <div className="text-right">
                  <span className="font-black text-slate-900">{act.amount}</span>
                  <span className="text-[10px] text-slate-400 block">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
