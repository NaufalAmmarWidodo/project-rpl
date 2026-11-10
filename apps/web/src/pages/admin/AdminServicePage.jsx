import React, { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import StatusBadge from "@/components/common/StatusBadge";
import {
  Wrench,
  Search,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Phone,
  DollarSign,
  Plus,
} from "lucide-react";

const INITIAL_SERVICE_TICKETS = [
  {
    id: "SRV-2026-081",
    customer: "Budi Santoso",
    phone: "085612345678",
    machine: "Canon ImageRunner IR-3245",
    problem: "Layar monitor Error E-000001 & pemanas fuser macet",
    address: "Jl. Cemerlang Raya No. 44, Perkantoran Blok C",
    status: "PROCESSING",
    technician: "Rian Pratama",
    cost: 185000,
    parts: "Roll Fuser Bawah (Canon IR 3245)",
    date: "10 Nov 2026",
  },
  {
    id: "SRV-2026-080",
    customer: "CV Grafika Mandiri",
    phone: "081299887766",
    machine: "Kyocera TASKalfa 3500i",
    problem: "Kertas paper jam kronis di tray penarik 2",
    address: "Kawasan Industri Pulo Gadung Kav 12",
    status: "PENDING",
    technician: "Belum Ditugaskan",
    cost: 120000,
    parts: "Pickup Roller Tray 2",
    date: "10 Nov 2026",
  },
  {
    id: "SRV-2026-079",
    customer: "Ruko Fotocopy Berkah",
    phone: "081377889900",
    machine: "Fuji Xerox DocuCentre IV-3065",
    problem: "Hasil print bergaris hitam memanjang",
    address: "Ruko Niaga Sentra Blok A2",
    status: "COMPLETED",
    technician: "Agus Supriadi",
    cost: 150000,
    parts: "Cleaning Blade Fuji Xerox",
    date: "05 Nov 2026",
  },
];

const TECHNICIANS = ["Rian Pratama", "Agus Supriadi", "Doni Saputra", "Eko Wahyudi"];

export default function AdminServicePage() {
  const [tickets, setTickets] = useState(INITIAL_SERVICE_TICKETS);
  const [search, setSearch] = useState("");
  const [assigningTicketId, setAssigningTicketId] = useState(null);
  const [selectedTech, setSelectedTech] = useState(TECHNICIANS[0]);

  const handleAssign = (ticketId) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, technician: selectedTech, status: "PROCESSING" }
          : t
      )
    );
    setAssigningTicketId(null);
  };

  const handleComplete = (ticketId) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: "COMPLETED" } : t))
    );
  };

  const filteredTickets = tickets.filter(
    (t) =>
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.customer.toLowerCase().includes(search.toLowerCase()) ||
      t.machine.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout
      headerTitle="Helpdesk Servis Mesin Fotocopy"
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Cari nomor tiket, tipe mesin fotocopy, atau pelanggan..."
    >
      <div className="space-y-6">
        {/* Ticket Management Table */}
        <div className="bg-white rounded-[28px] p-6 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Tiket Permintaan Kunjungan Service Teknisi
              </h3>
              <p className="text-xs text-slate-400">
                Disposisi teknisi servis fotocopy, diagnosa kerusakan mesin, dan estimasi biaya jasa
              </p>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              {filteredTickets.length} Tiket Terbuka
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-3">No. Tiket</th>
                  <th className="py-3 px-3">Pelanggan & Lokasi</th>
                  <th className="py-3 px-3">Mesin & Masalah</th>
                  <th className="py-3 px-3">Teknisi Ditugaskan</th>
                  <th className="py-3 px-3">Biaya Jasa</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Aksi Disposisi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTickets.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{t.id}</td>
                    <td className="py-3.5 px-3 max-w-xs">
                      <p className="font-bold text-slate-800">{t.customer}</p>
                      <p className="text-[10px] text-slate-400">{t.phone}</p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{t.address}</p>
                    </td>
                    <td className="py-3.5 px-3 max-w-sm">
                      <p className="font-bold text-slate-900">{t.machine}</p>
                      <p className="text-rose-600 text-[11px] mt-0.5 font-medium">{t.problem}</p>
                      {t.parts && (
                        <span className="inline-block text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded mt-1">
                          Part: {t.parts}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-slate-800">
                      {t.technician === "Belum Ditugaskan" ? (
                        <span className="text-amber-600 font-bold text-xs bg-amber-50 px-2.5 py-1 rounded-md">
                          Belum Ditugaskan
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5 text-slate-900">
                          <UserCheck size={14} className="text-emerald-600" />
                          <span>{t.technician}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-3 font-black text-slate-900">
                      Rp {t.cost.toLocaleString("id-ID")}
                    </td>
                    <td className="py-3.5 px-3">
                      <StatusBadge status={t.status} />
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {t.status === "PENDING" && (
                        <button
                          type="button"
                          onClick={() => setAssigningTicketId(t.id)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs ml-auto cursor-pointer"
                        >
                          <UserCheck size={13} />
                          <span>Tugaskan</span>
                        </button>
                      )}

                      {t.status === "PROCESSING" && (
                        <button
                          type="button"
                          onClick={() => handleComplete(t.id)}
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition flex items-center gap-1 ml-auto cursor-pointer"
                        >
                          <CheckCircle2 size={13} />
                          <span>Tandai Selesai</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Disposisi Teknisi */}
        {assigningTicketId && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-[28px] max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-base">
                  Penugasan Teknisi Servis
                </h4>
                <p className="text-xs text-slate-400">
                  Tiket: {assigningTicketId}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Pilih Nama Teknisi yang Bersedia
                </label>
                <select
                  value={selectedTech}
                  onChange={(e) => setSelectedTech(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800"
                >
                  {TECHNICIANS.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech} (Status: Siap Kunjungan)
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAssigningTicketId(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => handleAssign(assigningTicketId)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-black transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <UserCheck size={14} />
                  <span>Kirim Jadwal Teknisi</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
