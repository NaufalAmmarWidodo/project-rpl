import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomerLayout from "@/layouts/CustomerLayout";
import {
  ShoppingBag,
  Clock,
  Printer,
  ChevronRight,
  FileCheck,
  CheckCircle2,
  Package,
  ArrowRight,
  Eye,
} from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { cn } from "@/lib/utils";

const MOCK_ORDERS = [
  {
    id: "ORD-9022",
    date: "09 Nov 2026, 14:15 WIB",
    total: "Rp 247.000",
    status: "PROCESSING",
    type: "ATK + Print",
    itemCount: 3,
    items: [
      "2x Kertas HVS A4 70 GSM",
      "1x Pulpen Standard AE7 (Box)",
      "1x Jasa Print & Jilid Skripsi",
    ],
  },
  {
    id: "ORD-9019",
    date: "08 Nov 2026, 10:30 WIB",
    total: "Rp 75.000",
    status: "COMPLETED",
    type: "Percetakan",
    itemCount: 1,
    items: ["1x Cetak Spanduk Vinyl 3x1 Meter"],
  },
  {
    id: "ORD-9015",
    date: "03 Nov 2026, 16:45 WIB",
    total: "Rp 120.000",
    status: "COMPLETED",
    type: "ATK Retail",
    itemCount: 4,
    items: [
      "2x Buku Tulis Kiky 38 Lembar",
      "2x Map Plastik Kancing Folio",
    ],
  },
];

export default function OrderHistoryPage() {
  const [filter, setFilter] = useState("Semua");

  const filteredOrders = MOCK_ORDERS.filter((ord) => {
    if (filter === "Diproses") return ord.status === "PROCESSING" || ord.status === "PENDING";
    if (filter === "Selesai") return ord.status === "COMPLETED";
    return true;
  });

  return (
    <CustomerLayout headerTitle="Riwayat Pesanan Saya">
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="bg-white rounded-[28px] p-6 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">
              Daftar Pesanan ATK & Percetakan
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Pantau status verifikasi pembayaran dan proses pengerjaan berkas Anda
            </p>
          </div>

          {/* Filter Pills / Tabs */}
          <div className="flex items-center gap-2">
            {["Semua", "Diproses", "Selesai"].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "px-5 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer",
                  filter === f
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                )}
              >
                <span className={filter === f ? "text-white font-medium" : ""}>
                  {f}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-[28px] p-6 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-black text-slate-900 text-base">
                    #{order.id}
                  </span>
                  <StatusBadge status={order.status} />
                  <span className="text-[11px] font-bold text-slate-400">
                    {order.date}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {order.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold text-slate-700 bg-[#F8FAFC] border border-slate-200/70 px-3 py-1 rounded-xl"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-left md:text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Total Transaksi
                  </span>
                  <span className="text-lg font-black text-slate-900">
                    {order.total}
                  </span>
                </div>

                <Link
                  to={`/tracking/${order.id}`}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <Eye size={16} className="w-4 h-4 text-white shrink-0" />
                  <span className="text-white font-medium">Pelacakan Detail</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
}
