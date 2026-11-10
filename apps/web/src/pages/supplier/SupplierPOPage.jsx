import React, { useState } from "react";
import SupplierLayout from "@/layouts/SupplierLayout";
import StatusBadge from "@/components/common/StatusBadge";
import {
  Inbox,
  Send,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  X,
  FileText,
} from "lucide-react";

const INITIAL_POS = [
  {
    id: "PO-2026-089",
    date: "10 Nov 2026",
    item: "Kertas HVS A4 70gsm (PaperOne)",
    quantity: "150 Rim",
    totalAmount: "Rp 6.750.000",
    status: "PENDING",
    trackingRef: "Belum Ada Resi",
    eta: "Menunggu Input",
    notes: "Toko mendesak butuh pengiriman besok pagi",
  },
  {
    id: "PO-2026-088",
    date: "08 Nov 2026",
    item: "Toner Mesin Fotocopy NPG-51",
    quantity: "20 Tabung",
    totalAmount: "Rp 8.400.000",
    status: "PROCESSING",
    trackingRef: "LOG-SG-992100",
    eta: "11 Nov 2026, 10:00 WIB",
    notes: "Dikirim via Kurir Khusus Sinar Grafika",
  },
  {
    id: "PO-2026-087",
    date: "05 Nov 2026",
    item: "Drum Unit Canon IR 3235 / 3245",
    quantity: "6 Unit",
    totalAmount: "Rp 4.500.000",
    status: "COMPLETED",
    trackingRef: "LOG-SG-881290",
    eta: "07 Nov 2026 (Tiba)",
    notes: "Telah diterima teknisi toko",
  },
];

export default function SupplierPOPage() {
  const [orders, setOrders] = useState(INITIAL_POS);
  const [search, setSearch] = useState("");
  const [respondingPO, setRespondingPO] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [estimatedArrival, setEstimatedArrival] = useState("");

  const handleConfirmShipment = (e) => {
    e.preventDefault();
    if (!trackingNumber) return;

    setOrders((prev) =>
      prev.map((po) =>
        po.id === respondingPO.id
          ? {
              ...po,
              status: "PROCESSING",
              trackingRef: trackingNumber,
              eta: estimatedArrival || "Besok Sore",
            }
          : po
      )
    );
    setRespondingPO(null);
    setTrackingNumber("");
    setEstimatedArrival("");
  };

  const filtered = orders.filter(
    (po) =>
      po.id.toLowerCase().includes(search.toLowerCase()) ||
      po.item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SupplierLayout
      headerTitle="Purchase Order Masuk dari Toko"
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Cari nomor PO atau nama pasokan barang..."
    >
      <div className="space-y-6">
        <div className="bg-white rounded-[28px] p-6 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Daftar Request Pengadaan Pasokan
              </h3>
              <p className="text-xs text-slate-400">
                Konfirmasi ketersediaan barang dan terbitkan resi logistik pengantaran ke toko
              </p>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              {orders.length} Dokumen PO
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-3">Nomor PO</th>
                  <th className="py-3 px-3">Item Pasokan</th>
                  <th className="py-3 px-3">Jumlah Diminta</th>
                  <th className="py-3 px-3">Total Tagihan Grosir</th>
                  <th className="py-3 px-3">Estimasi Tiba</th>
                  <th className="py-3 px-3">Nomor Resi Kurir</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Aksi Respon</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((po) => (
                  <tr key={po.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{po.id}</td>
                    <td className="py-3.5 px-3">
                      <p className="font-bold text-slate-800">{po.item}</p>
                      <p className="text-[10px] text-slate-400">{po.notes}</p>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-slate-800">{po.quantity}</td>
                    <td className="py-3.5 px-3 font-black text-slate-900">{po.totalAmount}</td>
                    <td className="py-3.5 px-3 font-semibold text-slate-600">{po.eta}</td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-slate-700">
                      <span className="bg-slate-100 px-2 py-0.5 rounded">
                        {po.trackingRef}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <StatusBadge status={po.status} />
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {po.status === "PENDING" && (
                        <button
                          type="button"
                          onClick={() => {
                            setRespondingPO(po);
                            setTrackingNumber(`LOG-SG-${Math.floor(100000 + Math.random() * 900000)}`);
                          }}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs ml-auto cursor-pointer"
                        >
                          <Send size={12} />
                          <span>Respon & Input Resi</span>
                        </button>
                      )}

                      {po.status === "PROCESSING" && (
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                          Dalam Pengiriman
                        </span>
                      )}

                      {po.status === "COMPLETED" && (
                        <span className="text-xs font-bold text-slate-400">Telah Diterima</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Input Resi & Konfirmasi Pasokan */}
        {respondingPO && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <form
              onSubmit={handleConfirmShipment}
              className="bg-white rounded-[28px] max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">
                    Konfirmasi Pasokan & Terbitkan Resi
                  </h4>
                  <p className="text-xs text-slate-400">
                    PO: {respondingPO.id} - {respondingPO.item}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setRespondingPO(null)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nomor Resi / Surat Jalan Logistik
                </label>
                <div className="relative">
                  <Truck className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    required
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Contoh: LOG-SG-992144"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Estimasi Waktu Tiba di Toko (ETA)
                </label>
                <input
                  type="text"
                  required
                  value={estimatedArrival}
                  onChange={(e) => setEstimatedArrival(e.target.value)}
                  placeholder="Contoh: 11 Nov 2026, 14:00 WIB"
                  className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none focus:border-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRespondingPO(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-black transition flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Send size={13} />
                  <span>Kirim Resi ke Toko</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </SupplierLayout>
  );
}
