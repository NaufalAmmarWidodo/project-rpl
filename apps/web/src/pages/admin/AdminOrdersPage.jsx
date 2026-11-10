import React, { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import StatusBadge from "@/components/common/StatusBadge";
import {
  ShoppingCart,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  FileText,
  Printer,
  X,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const INITIAL_ORDERS = [
  {
    id: "ORD-9022",
    customer: "Budi Santoso",
    phone: "085612345678",
    type: "ATK + Print",
    items: "2x Kertas A4, 1x Pulpen AE7, Jilid Skripsi",
    total: "Rp 247.000",
    paymentMethod: "Bank BCA",
    status: "PROCESSING",
    date: "09 Nov 2026",
    proofUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600",
    printDoc: "Skripsi_Final_Budi_Santoso.pdf",
  },
  {
    id: "ORD-9021",
    customer: "Dewi Lestari",
    phone: "081233445566",
    type: "Percetakan",
    items: "Banner Spanduk Vinyl 3x1 m",
    total: "Rp 75.000",
    paymentMethod: "QRIS",
    status: "PENDING",
    date: "09 Nov 2026",
    proofUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600",
    printDoc: "Banner_Grand_Opening_Cafe.zip",
  },
  {
    id: "ORD-9020",
    customer: "PT Maju Bersama",
    phone: "082199887766",
    type: "ATK Retail",
    items: "10x Ordner Arsip, 20x Pulpen Standard",
    total: "Rp 320.000",
    paymentMethod: "Bank Mandiri",
    status: "PROCESSING",
    date: "09 Nov 2026",
    proofUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600",
    printDoc: null,
  },
  {
    id: "ORD-9018",
    customer: "Rian Hidayat",
    phone: "081911223344",
    type: "ATK",
    items: "Buku Tulis Kiky, Map Plastik",
    total: "Rp 28.000",
    paymentMethod: "CASH",
    status: "CANCELLED",
    date: "08 Nov 2026",
    proofUrl: null,
    printDoc: null,
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [search, setSearch] = useState("");
  const [selectedProofOrder, setSelectedProofOrder] = useState(null);

  const handleApprove = (id) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status: "PROCESSING" } : ord))
    );
    setSelectedProofOrder(null);
  };

  const handleReject = (id) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status: "CANCELLED" } : ord))
    );
    setSelectedProofOrder(null);
  };

  const handleComplete = (id) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status: "COMPLETED" } : ord))
    );
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.items.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout
      headerTitle="Pesanan & Verifikasi Pembayaran"
      searchPlaceholder="Cari order ID, pelanggan, atau barang..."
      searchValue={search}
      onSearchChange={setSearch}
    >
      <div className="space-y-6">
        
        {/* Table Panel Card */}
        <div className="bg-white rounded-[28px] p-6 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 mb-4 gap-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Daftar Seluruh Pesanan Retail & Percetakan
              </h3>
              <p className="text-xs text-slate-400">
                Validasi bukti pembayaran pelanggan dan unduh berkas dokumen sebelum dicetak
              </p>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
              {filteredOrders.length} Pesanan Tercatat
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-3">Order ID</th>
                  <th className="py-3 px-3">Pelanggan</th>
                  <th className="py-3 px-3">Rincian Barang / Cetak</th>
                  <th className="py-3 px-3">Total Tagihan</th>
                  <th className="py-3 px-3">Metode Bayar</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Aksi Verifikasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{ord.id}</td>
                    <td className="py-3.5 px-3">
                      <p className="font-bold text-slate-800">{ord.customer}</p>
                      <p className="text-[10px] text-slate-400">{ord.phone}</p>
                    </td>
                    <td className="py-3.5 px-3 max-w-xs">
                      <p className="text-slate-700 truncate font-medium">{ord.items}</p>
                      {ord.printDoc && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded mt-0.5">
                          <Printer size={10} /> {ord.printDoc}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 font-black text-slate-900">{ord.total}</td>
                    <td className="py-3.5 px-3 font-semibold text-slate-600">{ord.paymentMethod}</td>
                    <td className="py-3.5 px-3">
                      <StatusBadge status={ord.status} />
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {ord.proofUrl && (
                          <button
                            type="button"
                            onClick={() => setSelectedProofOrder(ord)}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                            title="Inspeksi Bukti Bayar & Dokumen"
                          >
                            <Eye size={14} />
                          </button>
                        )}

                        {ord.status === "PENDING" && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleApprove(ord.id)}
                              className="px-2.5 py-1.5 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-2xs cursor-pointer"
                            >
                              <CheckCircle size={12} /> Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => handleReject(ord.id)}
                              className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                            >
                              <XCircle size={12} /> Reject
                            </button>
                          </>
                        )}

                        {ord.status === "PROCESSING" && (
                          <button
                            type="button"
                            onClick={() => handleComplete(ord.id)}
                            className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                          >
                            <CheckCircle size={12} /> Selesai
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Inspeksi Bukti Bayar & File Cetak */}
        {selectedProofOrder && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-[28px] max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">
                    Verifikasi Pembayaran & Berkas
                  </h4>
                  <p className="text-xs text-slate-400">
                    Order ID: {selectedProofOrder.id} ({selectedProofOrder.customer})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProofOrder(null)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Preview Bukti Transfer */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Foto / Bukti Transfer
                </span>
                <div className="rounded-xl overflow-hidden border border-slate-200 aspect-16/9 bg-slate-50">
                  <img
                    src={selectedProofOrder.proofUrl}
                    alt="Bukti Transfer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Berkas Cetak Bila Ada */}
              {selectedProofOrder.printDoc && (
                <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-orange-600" />
                    <div>
                      <p className="text-xs font-bold text-orange-900">
                        {selectedProofOrder.printDoc}
                      </p>
                      <p className="text-[10px] text-orange-700">File Siap Cetak Pelanggan</p>
                    </div>
                  </div>
                  <a
                    href="#download"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Mengunduh file: ${selectedProofOrder.printDoc}`);
                    }}
                    className="text-xs font-bold text-orange-700 underline hover:text-orange-900 flex items-center gap-1"
                  >
                    <span>Unduh</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}

              {/* Action Buttons inside modal */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleReject(selectedProofOrder.id)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 cursor-pointer"
                >
                  Tolak Pembayaran
                </button>
                <button
                  type="button"
                  onClick={() => handleApprove(selectedProofOrder.id)}
                  className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-black transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <CheckCircle size={13} />
                  <span>Setujui & Proses Order</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
