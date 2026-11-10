import React, { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import StatusBadge from "@/components/common/StatusBadge";
import {
  Truck,
  Plus,
  Send,
  AlertCircle,
  X,
} from "lucide-react";

const INITIAL_POS = [
  {
    id: "PO-2026-044",
    supplier: "PT Sinar Grafika Mitra Logistik",
    item: "Kertas HVS F4 70 GSM Sinar Dunia",
    quantity: 50,
    unit: "Rim",
    totalCost: "Rp 2.450.000",
    status: "PROCESSING",
    statusLabel: "Dikonfirmasi Mitra (Dalam Pengiriman)",
    trackingRef: "LOG-SG-992144",
    date: "09 Nov 2026",
  },
  {
    id: "PO-2026-043",
    supplier: "PT Sinar Grafika Mitra Logistik",
    item: "Drum Unit Canon IR 3235 / 3245",
    quantity: 5,
    unit: "Unit",
    totalCost: "Rp 3.750.000",
    status: "COMPLETED",
    statusLabel: "Barang Telah Diterima di Gudang",
    trackingRef: "LOG-SG-881203",
    date: "02 Nov 2026",
  },
];

export default function AdminPurchaseOrderPage() {
  const [purchaseOrders, setPurchaseOrders] = useState(INITIAL_POS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("Kertas HVS F4 70 GSM Sinar Dunia");
  const [quantity, setQuantity] = useState(50);
  const [notes, setNotes] = useState("Restock mendesak untuk stok toko menipis");

  const handleCreatePO = (e) => {
    e.preventDefault();
    const newPO = {
      id: `PO-2026-0${purchaseOrders.length + 45}`,
      supplier: "PT Sinar Grafika Mitra Logistik",
      item: selectedProduct,
      quantity,
      unit: "Rim / Unit",
      totalCost: `Rp ${(quantity * 48000).toLocaleString("id-ID")}`,
      status: "PENDING",
      statusLabel: "Menunggu Konfirmasi Supplier",
      trackingRef: "Menunggu Resi",
      date: "10 Nov 2026",
    };

    setPurchaseOrders([newPO, ...purchaseOrders]);
    setIsModalOpen(false);
  };

  return (
    <AdminLayout
      headerTitle="Pengadaan Pasokan (Purchase Order)"
      searchPlaceholder="Cari nomor PO, nama barang pasokan, atau resi..."
      headerAction={
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <Plus size={14} />
          <span>Buat PO Pasokan Baru</span>
        </button>
      }
    >
      <div className="space-y-6">
        
        {/* Trigger Alert Card (Gambar 1 style) */}
        <div className="bg-amber-50 rounded-[28px] p-6 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="font-bold text-amber-900 text-sm">
                2 Produk Berada di Bawah Batas Minimum Stok
              </h4>
              <p className="text-xs text-amber-700 mt-0.5">
                Kertas HVS F4 (Sisa 5 Rim) & Drum Unit Canon IR 3235 (Sisa 4 Unit). Segera ajukan PO pengadaan pasokan.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-2xs shrink-0 self-start sm:self-auto cursor-pointer"
          >
            Kirim Request Restock Sekarang →
          </button>
        </div>

        {/* PO Table Card */}
        <div className="bg-white rounded-[28px] p-6 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Riwayat Pengadaan Purchase Order ke Supplier
              </h3>
              <p className="text-xs text-slate-400">
                Pantau konfirmasi ketersediaan barang grosir dan nomor resi pengiriman logistik
              </p>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              {purchaseOrders.length} Dokumen PO
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-3">No. PO</th>
                  <th className="py-3 px-3">Mitra Supplier</th>
                  <th className="py-3 px-3">Barang Pasokan</th>
                  <th className="py-3 px-3">Jumlah Diminta</th>
                  <th className="py-3 px-3">Total Biaya Grosir</th>
                  <th className="py-3 px-3">Nomor Resi Logistik</th>
                  <th className="py-3 px-3 text-right">Status PO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {purchaseOrders.map((po) => (
                  <tr key={po.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{po.id}</td>
                    <td className="py-3.5 px-3">
                      <p className="font-bold text-slate-800">{po.supplier}</p>
                      <p className="text-[10px] text-slate-400">{po.date}</p>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-slate-900">{po.item}</td>
                    <td className="py-3.5 px-3 font-black text-slate-800">
                      {po.quantity} {po.unit}
                    </td>
                    <td className="py-3.5 px-3 font-black text-slate-900">{po.totalCost}</td>
                    <td className="py-3.5 px-3">
                      <span className="font-mono text-[11px] bg-slate-100 px-2.5 py-1 rounded-md text-slate-700">
                        {po.trackingRef}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <StatusBadge status={po.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Buat PO Baru */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <form
              onSubmit={handleCreatePO}
              className="bg-white rounded-[28px] max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">
                    Penerbitan Purchase Order (PO) Baru
                  </h4>
                  <p className="text-xs text-slate-400">
                    Kirim permintaan restock langsung ke portal mitra logistik
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mitra Supplier Dituju
                </label>
                <input
                  type="text"
                  disabled
                  value="PT Sinar Grafika Mitra Logistik (supplier@mitra.com)"
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Item Pasokan Barang / Suku Cadang
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800"
                >
                  <option value="Kertas HVS F4 70 GSM Sinar Dunia">Kertas HVS F4 70 GSM (Sisa 5 Rim)</option>
                  <option value="Drum Unit Canon IR 3235 / 3245">Drum Unit Canon IR 3235 (Sisa 4 Unit)</option>
                  <option value="Kertas HVS A4 70 GSM PaperOne">Kertas HVS A4 70 GSM</option>
                  <option value="Toner Mesin Fotocopy NPG-51 Original">Toner Fotocopy NPG-51</option>
                  <option value="Roll Fuser Bawah Canon IR 3300">Roll Fuser Bawah IR 3300</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Jumlah Permintaan Restock
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Catatan Pengiriman / Alamat Gudang Toko
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-black transition flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Send size={13} />
                  <span>Kirim PO ke Portal Supplier</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
