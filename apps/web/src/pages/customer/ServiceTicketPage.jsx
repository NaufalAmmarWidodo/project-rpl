import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomerLayout from "@/layouts/CustomerLayout";
import {
  Wrench,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  Phone,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { cn } from "@/lib/utils";

const SAMPLE_TICKETS = [
  {
    id: "SRV-2026-081",
    machine: "Canon ImageRunner IR-3245",
    problem: "Error E-000001 (Fuser unit overheat) & roll pemanas macet.",
    technician: "Rian Pratama (Senior Field Technician)",
    technicianPhone: "081298765431",
    status: "PROCESSING",
    statusLabel: "Teknisi Menuju Lokasi",
    preferredDate: "10 Nov 2026",
    address: "Jl. Cemerlang Raya No. 44, Perkantoran Blok C",
    estimatedCost: "Rp 185.000",
    sparepartsNeeded: "Roll Fuser Bawah (Canon IR 3245)",
    steps: [
      { step: 1, title: "Tiket Terdaftar", time: "10 Nov 08:30 WIB", done: true },
      { step: 2, title: "Teknisi Ditugaskan", time: "10 Nov 09:00 WIB", done: true },
      { step: 3, title: "Menuju Lokasi Pelanggan", time: "Estimasi Tiba ~20 Menit", current: true },
      { step: 4, title: "Pergantian Part & Kalibrasi Mesin", time: "Pending", done: false },
      { step: 5, title: "Selesai & Berita Acara Servis", time: "Pending", done: false },
    ],
  },
  {
    id: "SRV-2026-079",
    machine: "Fuji Xerox DocuCentre IV-3065",
    problem: "Bercak hitam memanjang di drum unit saat fotocopy buku.",
    technician: "Agus Supriadi",
    technicianPhone: "081377889900",
    status: "COMPLETED",
    statusLabel: "Selesai Diperbaiki",
    preferredDate: "05 Nov 2026",
    address: "Ruko Niaga Sentra Blok A2",
    estimatedCost: "Rp 150.000",
    sparepartsNeeded: "Cleaning Blade Fuji Xerox",
    steps: [
      { step: 1, title: "Tiket Terdaftar", time: "05 Nov 10:00 WIB", done: true },
      { step: 2, title: "Teknisi Ditugaskan", time: "05 Nov 10:30 WIB", done: true },
      { step: 3, title: "Menuju Lokasi Pelanggan", time: "05 Nov 11:15 WIB", done: true },
      { step: 4, title: "Pergantian Part & Kalibrasi Mesin", time: "05 Nov 12:30 WIB", done: true },
      { step: 5, title: "Selesai & Berita Acara Servis", time: "05 Nov 13:00 WIB", done: true },
    ],
  },
];

export default function ServiceTicketPage() {
  const [selectedTicket, setSelectedTicket] = useState(SAMPLE_TICKETS[0]);

  return (
    <CustomerLayout headerTitle="Pelacakan Tiket Servis Fotocopy">
      <div className="space-y-6">
        {/* Header Summary */}
        <div className="bg-white rounded-[28px] p-6 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">
              Status Panggilan Servis Mesin
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Pantau pergerakan teknisi dan ketersediaan suku cadang mesin Anda secara real-time
            </p>
          </div>

          <Link
            to="/service"
            className="bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold transition shadow-xs flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Wrench size={14} />
            <span>Panggil Teknisi Baru</span>
          </Link>
        </div>

        {/* Ticket Selector Tabs */}
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {SAMPLE_TICKETS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedTicket(t)}
              className={cn(
                "px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2.5 whitespace-nowrap border",
                selectedTicket.id === t.id
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50"
              )}
            >
              <span>{t.id}</span>
              <span className="text-[10px] font-normal opacity-80">({t.machine.split(" ")[0]})</span>
            </button>
          ))}
        </div>

        {/* Selected Ticket Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Timeline */}
          <div className="lg:col-span-7 bg-white rounded-[28px] p-6 sm:p-7 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                  Nomor Tiket
                </span>
                <h4 className="text-base font-black text-slate-900">{selectedTicket.id}</h4>
              </div>
              <StatusBadge status={selectedTicket.status} />
            </div>

            {/* Stepper Timeline */}
            <div className="relative pl-2">
              <div className="space-y-7 relative before:absolute before:inset-0 before:left-4 before:h-full before:w-0.5 before:bg-slate-100">
                {selectedTicket.steps.map((st) => (
                  <div key={st.step} className="relative flex items-start gap-4">
                    <div
                      className={cn(
                        "relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition shadow-xs",
                        st.done
                          ? "bg-slate-900 text-white"
                          : st.current
                          ? "bg-[#F97316] text-white ring-4 ring-orange-100 animate-pulse"
                          : "bg-white border-2 border-slate-200 text-slate-400"
                      )}
                    >
                      {st.done ? <CheckCircle2 size={15} /> : st.step}
                    </div>

                    <div className="pt-1 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5">
                        <p
                          className={cn(
                            "text-xs font-bold",
                            st.current ? "text-orange-600" : st.done ? "text-slate-900" : "text-slate-400"
                          )}
                        >
                          {st.title}
                        </p>
                        <span className="text-[11px] text-slate-400">{st.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Mesin & Info Teknisi */}
          <div className="lg:col-span-5 space-y-5">
            {/* Info Teknisi Ditugaskan */}
            <div className="bg-white rounded-[28px] p-6 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                  <UserCheck size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Teknisi Bertugas</h4>
                  <p className="text-[11px] text-slate-400">{selectedTicket.technician}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Kontak Langsung</span>
                  <span className="font-bold text-slate-900">{selectedTicket.technicianPhone}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimasi Biaya Perbaikan</span>
                  <span className="font-bold text-orange-600">{selectedTicket.estimatedCost}</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${selectedTicket.technicianPhone.replace(/^0/, "62")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-2.5 text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageSquare size={14} />
                <span>Chat Teknisi di Jalan</span>
              </a>
            </div>

            {/* Detail Kerusakan */}
            <div className="bg-white rounded-[28px] p-6 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Spesifikasi Mesin & Suku Cadang
              </h4>
              <p className="text-xs font-bold text-slate-900">{selectedTicket.machine}</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{selectedTicket.problem}</p>

              <div className="mt-3 p-3 bg-[#F8FAFC] rounded-xl border border-slate-200/80 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Suku Cadang yang Disiapkan Teknisi:
                </span>
                <span className="font-bold text-slate-800">{selectedTicket.sparepartsNeeded}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
