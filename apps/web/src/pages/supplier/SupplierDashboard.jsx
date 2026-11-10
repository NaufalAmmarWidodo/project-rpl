import React from "react";
import { Link } from "react-router-dom";
import SupplierLayout from "@/layouts/SupplierLayout";
import MetricCard from "@/components/common/MetricCard";
import StatusBadge from "@/components/common/StatusBadge";
import {
  Boxes,
  Truck,
  Receipt,
  CheckCircle2,
  DollarSign,
  ArrowRight,
} from "lucide-react";

const RECENT_POS = [
  {
    id: "PO-2026-089",
    date: "10 Nov 2026",
    item: "Kertas HVS A4 70gsm (PaperOne)",
    quantity: "150 Rim",
    totalAmount: "Rp 6.750.000",
    status: "PENDING",
    trackingRef: "Belum Ada Resi",
  },
  {
    id: "PO-2026-088",
    date: "08 Nov 2026",
    item: "Toner Mesin Fotocopy NPG-51",
    quantity: "20 Tabung",
    totalAmount: "Rp 8.400.000",
    status: "PROCESSING",
    trackingRef: "LOG-SG-992100",
  },
  {
    id: "PO-2026-087",
    date: "05 Nov 2026",
    item: "Drum Unit Canon IR 3235 / 3245",
    quantity: "6 Unit",
    totalAmount: "Rp 4.500.000",
    status: "COMPLETED",
    trackingRef: "LOG-SG-881290",
  },
];

export default function SupplierDashboard() {
  const rightWidgetContent = (
    <div className="space-y-6">
      {/* SLA Pengiriman */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200/60 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Ketepatan Pengiriman</h3>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            96% Tepat Waktu
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-3 leading-relaxed">
          Rata-rata lead time dari PO Diterima hingga resi kurir terbit adalah 2,4 jam.
        </p>
      </div>

      {/* Tindakan Cepat */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-3">
        <span className="text-[10px] font-bold tracking-wider uppercase text-orange-400">
          Shortcut Logistik
        </span>
        <h4 className="font-bold text-sm">Respon Pesanan Pasokan</h4>
        <div className="space-y-2 pt-2 text-xs">
          <Link
            to="/supplier/po-masuk"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
          >
            <span>Input Resi Pengiriman (2 Baru)</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            to="/supplier/katalog-pasokan"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
          >
            <span>Update Harga Grosir Pasokan</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <SupplierLayout
      headerTitle="Overview Mitra Logistik & Pasokan"
      rightWidget={rightWidgetContent}
      headerAction={
        <Link
          to="/supplier/po-masuk"
          className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm inline-flex items-center gap-2 cursor-pointer transition"
        >
          <Boxes size={15} />
          <span>2 PO Masuk Perlu Respon</span>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={Boxes}
            label="Total Pasokan Terkirim"
            value="1.240 Item"
            change="+18% bulan ini"
            isPositive={true}
          />
          <MetricCard
            icon={Truck}
            label="Pengiriman Berjalan"
            value="3 Armada"
            change="Dalam perjalanan"
            isPositive={true}
          />
          <MetricCard
            icon={DollarSign}
            label="Tagihan Siap Cair"
            value="Rp 19.650.000"
            change="Jatuh tempo 3 hari"
            isPositive={true}
          />
          <MetricCard
            icon={CheckCircle2}
            label="Mitra Toko Terhubung"
            value="Fotocopy CI"
            change="Prioritas Utama"
            isPositive={true}
          />
        </div>

        {/* PO Masuk Cepat */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Purchase Order Terkini dari Toko</h3>
              <p className="text-sm text-slate-500 font-normal mt-0.5">
                Permintaan restock barang dan suku cadang mesin fotocopy
              </p>
            </div>
            <Link to="/supplier/po-masuk" className="text-xs font-semibold text-orange-600 hover:underline">
              Buka Semua PO →
            </Link>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {RECENT_POS.map((po) => (
              <div key={po.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{po.id}</span>
                    <StatusBadge status={po.status} />
                    <span className="text-[11px] text-slate-400">{po.date}</span>
                  </div>
                  <p className="font-semibold text-slate-900 text-sm mt-1">{po.item}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Kuantitas: {po.quantity} • Resi: {po.trackingRef}</p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="text-base font-bold text-slate-900">{po.totalAmount}</span>
                  <Link
                    to="/supplier/po-masuk"
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg shadow-sm inline-flex items-center gap-1.5 transition"
                  >
                    Buka Respon
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SupplierLayout>
  );
}
