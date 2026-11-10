import React from "react";
import { Link, useParams } from "react-router-dom";
import CustomerLayout from "@/layouts/CustomerLayout";
import {
  CheckCircle2,
  Clock,
  Package,
  Printer,
  Truck,
  Store,
  FileCheck,
  ShieldCheck,
  MessageSquare,
  ArrowLeft,
  Copy,
  Check,
} from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { cn } from "@/lib/utils";

const TIMELINE_STEPS = [
  {
    step: 1,
    title: "Pesanan Dibuat",
    desc: "Order berhasil tercatat dalam sistem",
    time: "09 Nov 2026, 14:15 WIB",
    status: "completed",
    icon: CheckCircle2,
  },
  {
    step: 2,
    title: "Verifikasi Pembayaran",
    desc: "Admin sedang memvalidasi mutasi bukti bayar",
    time: "09 Nov 2026, 14:20 WIB",
    status: "active",
    icon: Clock,
  },
  {
    step: 3,
    title: "Pengerjaan & Pengemasan",
    desc: "Dokumen dicetak dan barang ATK disiapkan dari gudang",
    time: "Estimasi ~30 menit",
    status: "pending",
    icon: Printer,
  },
  {
    step: 4,
    title: "Siap Diambil / Dikirim",
    desc: "Siap diambil di gerai atau diserahkan ke kurir",
    time: "Hari ini",
    status: "pending",
    icon: Store,
  },
];

export default function OrderTrackingPage() {
  const { orderId = "ORD-9022" } = useParams();
  const [copied, setCopied] = React.useState(false);

  const handleCopyOrder = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const rightWidgetContent = (
    <div className="space-y-5">
      {/* 1. Bantuan CS */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-100">
        <h3 className="font-bold text-gray-900 text-sm pb-3 border-b border-gray-100">
          Butuh Bantuan Pesanan?
        </h3>
        <p className="text-xs text-gray-500 mt-3 leading-relaxed">
          Hubungi operator kasir atau teknisi cetak jika ingin mengubah instruksi cetak atau konfirmasi pengambilan.
        </p>

        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3 text-xs font-bold transition shadow-xs flex items-center justify-center gap-2"
        >
          <MessageSquare size={16} />
          <span>Chat WhatsApp Toko</span>
        </a>
      </div>

      {/* 2. Informasi Gerai */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-100">
        <h4 className="font-bold text-gray-900 text-xs mb-2">Lokasi Pengambilan Gerai</h4>
        <p className="text-xs font-semibold text-gray-800">Fotocopy Cemerlang Indah</p>
        <p className="text-[11px] text-gray-500 mt-1">
          Jl. Cemerlang Raya No. 12 (Depan Kampus / Perkantoran)
        </p>
        <p className="text-[11px] text-gray-400 mt-2">Buka: 08.00 - 21.00 WIB</p>
      </div>
    </div>
  );

  return (
    <CustomerLayout
      headerTitle="Pelacakan Pesanan Real-time"
      rightWidget={rightWidgetContent}
    >
      <div className="space-y-6">
        {/* Header Order Banner */}
        <div className="bg-white rounded-[28px] p-6 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black text-gray-900 tracking-tight">
                Pesanan #{orderId}
              </h2>
              <button
                type="button"
                onClick={handleCopyOrder}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition cursor-pointer"
                title="Salin No. Pesanan"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Dipesan pada 09 Nov 2026, 14:15 WIB • Pembayaran Bank BCA
            </p>
          </div>

          <div className="flex items-center gap-2">
            <StatusBadge status="Diproses" />
          </div>
        </div>

        {/* Visual Progress Stepper Timeline */}
        <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
          <h3 className="font-bold text-gray-900 text-sm mb-6">Status Pengerjaan</h3>

          <div className="relative">
            <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 before:h-full before:w-0.5 before:bg-gray-100">
              {TIMELINE_STEPS.map((step) => {
                const Icon = step.icon;
                const isCompleted = step.status === "completed";
                const isActive = step.status === "active";

                return (
                  <div key={step.step} className="relative flex items-start gap-5">
                    {/* Circle Node */}
                    <div
                      className={cn(
                        "relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all shadow-xs",
                        isCompleted
                          ? "bg-slate-900 text-white ring-4 ring-slate-100"
                          : isActive
                          ? "bg-[#FF6B35] text-white ring-4 ring-orange-100 animate-pulse"
                          : "bg-white border-2 border-gray-200 text-gray-400"
                      )}
                    >
                      <Icon size={14} />
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pt-0.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4
                          className={cn(
                            "text-xs font-bold",
                            isActive ? "text-gray-900" : isCompleted ? "text-gray-800" : "text-gray-400"
                          )}
                        >
                          {step.title}
                        </h4>
                        <span className="text-[11px] text-gray-400 font-medium">{step.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Details List */}
        <div className="bg-white rounded-[28px] p-6 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
          <h3 className="font-bold text-gray-900 text-sm mb-4">Rincian Item yang Dipesan</h3>

          <div className="divide-y divide-gray-100 text-xs">
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">2x Kertas HVS A4 70 GSM</p>
                <p className="text-[11px] text-gray-400">Kategori ATK • Rim 500 Lembar</p>
              </div>
              <span className="font-bold text-gray-900">Rp 110.000</span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">1x Pulpen Standard AE7 (Box)</p>
                <p className="text-[11px] text-gray-400">Kategori ATK • Box 12 Pcs</p>
              </div>
              <span className="font-bold text-gray-900">Rp 42.000</span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">1x Jasa Print & Jilid Skripsi</p>
                <p className="text-[11px] text-gray-400">Percetakan • 65 hal Full Color • Hardcover</p>
              </div>
              <span className="font-bold text-gray-900">Rp 95.000</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="font-bold text-gray-700 text-xs">Total Pembayaran (Lunas)</span>
            <span className="text-base font-black text-gray-900">Rp 247.000</span>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
