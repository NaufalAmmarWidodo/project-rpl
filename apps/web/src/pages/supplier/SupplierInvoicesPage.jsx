import React, { useState } from "react";
import SupplierLayout from "@/layouts/SupplierLayout";
import StatusBadge from "@/components/common/StatusBadge";
import {
  Receipt,
  Download,
} from "lucide-react";

const INITIAL_INVOICES = [
  {
    invNumber: "INV-SG-2026-091",
    poNumber: "PO-2026-088",
    description: "Pasokan 20 Tabung Toner Canon NPG-51",
    amount: "Rp 8.400.000",
    dueDate: "20 Nov 2026",
    status: "PROCESSING",
    statusText: "Menunggu Pencairan Toko",
    paidDate: "-",
  },
  {
    invNumber: "INV-SG-2026-085",
    poNumber: "PO-2026-087",
    description: "Pasokan 6 Unit Drum Canon IR 3235",
    amount: "Rp 4.500.000",
    dueDate: "12 Nov 2026",
    status: "COMPLETED",
    statusText: "Lunas Ditransfer",
    paidDate: "07 Nov 2026",
  },
  {
    invNumber: "INV-SG-2026-079",
    poNumber: "PO-2026-082",
    description: "Pasokan 200 Rim Kertas HVS A4 & F4 Sidu",
    amount: "Rp 9.600.000",
    dueDate: "30 Okt 2026",
    status: "COMPLETED",
    statusText: "Lunas Ditransfer",
    paidDate: "28 Okt 2026",
  },
];

export default function SupplierInvoicesPage() {
  const [invoices] = useState(INITIAL_INVOICES);

  return (
    <SupplierLayout headerTitle="Faktur Tagihan & Pencairan Dana">
      <div className="space-y-6">
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-[24px] p-5 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
            <span className="text-xs font-bold text-slate-400 block mb-1">Total Tagihan Tertagih</span>
            <span className="text-2xl font-black text-slate-900">Rp 22.500.000</span>
            <span className="text-[11px] font-semibold text-emerald-600 block mt-1">3 Transaksi PO</span>
          </div>

          <div className="bg-white rounded-[24px] p-5 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
            <span className="text-xs font-bold text-slate-400 block mb-1">Telah Ditransfer Toko</span>
            <span className="text-2xl font-black text-emerald-600">Rp 14.100.000</span>
            <span className="text-[11px] font-semibold text-slate-400 block mt-1">Status Lunas</span>
          </div>

          <div className="bg-white rounded-[24px] p-5 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
            <span className="text-xs font-bold text-slate-400 block mb-1">Menunggu Jatuh Tempo</span>
            <span className="text-2xl font-black text-orange-600">Rp 8.400.000</span>
            <span className="text-[11px] font-semibold text-slate-400 block mt-1">Jatuh Tempo 20 Nov</span>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="bg-white rounded-[28px] p-6 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Daftar Faktur Pembayaran</h3>
              <p className="text-xs text-slate-400">Arsip penagihan pasokan barang dan mutasi dana ke rekening supplier</p>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              Rekening BCA: 827-019-9921
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-3">Nomor Faktur</th>
                  <th className="py-3 px-3">Referensi PO Toko</th>
                  <th className="py-3 px-3">Keterangan Pengadaan</th>
                  <th className="py-3 px-3">Jumlah Tagihan</th>
                  <th className="py-3 px-3">Jatuh Tempo</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Faktur Digital</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) => (
                  <tr key={inv.invNumber} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{inv.invNumber}</td>
                    <td className="py-3.5 px-3 font-semibold text-slate-700">{inv.poNumber}</td>
                    <td className="py-3.5 px-3 font-medium text-slate-800">{inv.description}</td>
                    <td className="py-3.5 px-3 font-black text-slate-900">{inv.amount}</td>
                    <td className="py-3.5 px-3 font-semibold text-slate-600">{inv.dueDate}</td>
                    <td className="py-3.5 px-3">
                      <StatusBadge status={inv.status} />
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => alert(`Mengunduh PDF Faktur Resmi ${inv.invNumber}`)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition inline-flex items-center gap-1 ml-auto cursor-pointer"
                        title="Download Faktur PDF"
                      >
                        <Download size={13} />
                        <span className="text-[11px] font-bold">PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SupplierLayout>
  );
}
