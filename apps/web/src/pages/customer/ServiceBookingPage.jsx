import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomerLayout from "@/layouts/CustomerLayout";
import {
  Wrench,
  AlertTriangle,
  UploadCloud,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Phone,
  ShieldCheck,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const COMMON_ERRORS = [
  { code: "E-000001", desc: "Pemanas fuser unit macet / panas berlebih" },
  { code: "E-000007", desc: "Film fuser sobek / thermistor rusak" },
  { code: "Jam 0101", desc: "Kertas tersangkut di roller penarik pertama" },
  { code: "Bercak Hitam", desc: "Drum unit bergaris / cleaning blade bocor" },
];

export default function ServiceBookingPage() {
  const navigate = useNavigate();
  const [machineBrand, setMachineBrand] = useState("Canon ImageRunner");
  const [machineModel, setMachineModel] = useState("IR-3245 / 3300");
  const [errorCode, setErrorCode] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setBookedSuccess(true);
      setTimeout(() => {
        navigate("/tiket-service");
      }, 1500);
    }, 1000);
  };

  const rightWidgetContent = (
    <div className="space-y-5">
      {/* 1. SOP Kunjungan Teknisi */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-slate-200/70">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Wrench size={16} />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Standar Layanan Servis</h3>
        </div>

        <div className="mt-4 space-y-3 text-xs text-slate-600">
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <p>Teknisi bersertifikasi spesialis mesin Canon, Fuji Xerox, & Kyocera.</p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <p>Garansi servis pengerjaan 14 hari kerja.</p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <p>Ketersediaan suku cadang asli (drum, toner, roll fuser) siap pasang di tempat.</p>
          </div>
        </div>
      </div>

      {/* 2. Hotline Emergency */}
      <div className="bg-slate-900 text-white rounded-[28px] p-6 shadow-sm">
        <span className="text-[10px] font-bold tracking-wider uppercase text-orange-400">
          Bantuan Cepat Kasir / Toko
        </span>
        <h4 className="font-bold text-sm mt-1">Perlu Servis Darurat Hari Ini?</h4>
        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
          Hubungi dispatch teknisi langsung jika mesin fotocopy Anda mati total saat jam operasional padat.
        </p>

        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full bg-[#F97316] hover:bg-[#ea580c] text-white rounded-xl py-3 text-xs font-bold transition flex items-center justify-center gap-2"
        >
          <Phone size={15} />
          <span>Hubungi Teknisi Standby</span>
        </a>
      </div>
    </div>
  );

  return (
    <CustomerLayout
      headerTitle="Panggilan Servis Mesin Fotocopy"
      rightWidget={rightWidgetContent}
    >
      <div className="space-y-6">
        {bookedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-2xs">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <span>
              Tiket servis berhasil dibuat! Mengalihkan Anda ke halaman pelacakan tiket...
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card 1: Data Mesin Fotocopy */}
          <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3 pb-5 mb-5 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                1
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Identifikasi Mesin Fotocopy</h3>
                <p className="text-xs text-slate-400">Pilih merek dan tipe mesin fotocopy Anda</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Merek Mesin
                </label>
                <select
                  value={machineBrand}
                  onChange={(e) => setMachineBrand(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-slate-900"
                >
                  <option value="Canon ImageRunner">Canon ImageRunner (iR / Advance)</option>
                  <option value="Fuji Xerox DocuCentre">Fuji Xerox DocuCentre / ApeosPort</option>
                  <option value="Kyocera TASKalfa">Kyocera TASKalfa</option>
                  <option value="Konica Minolta Bizhub">Konica Minolta Bizhub</option>
                  <option value="Epson WorkForce Pro">Epson WorkForce Inkjet</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Model / Tipe Mesin
                </label>
                <input
                  type="text"
                  required
                  value={machineModel}
                  onChange={(e) => setMachineModel(e.target.value)}
                  placeholder="Contoh: iR 3235, iR 3300, Apeos 450"
                  className="w-full bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-slate-900"
                />
              </div>
            </div>

            {/* Rekomendasi Error Cepat */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Pilih Kode Error Umum (Atau ketik sendiri di bawah):
              </label>
              <div className="flex flex-wrap gap-2">
                {COMMON_ERRORS.map((err) => (
                  <button
                    key={err.code}
                    type="button"
                    onClick={() => {
                      setErrorCode(err.code);
                      setProblemDescription(`${err.code}: ${err.desc}`);
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-bold border transition text-left",
                      errorCode === err.code
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-[#F8FAFC] text-slate-600 border-slate-200/80 hover:bg-slate-100"
                    )}
                  >
                    <span>{err.code}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Gejala Kerusakan & Foto Error */}
          <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3 pb-5 mb-5 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                2
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Deskripsi Kerusakan & Foto</h3>
                <p className="text-xs text-slate-400">Jelaskan kendala mesin agar teknisi membawa suku cadang yang tepat</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Kode Error / Gejala Mesin
                </label>
                <textarea
                  required
                  rows={3}
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder="Contoh: Mesin menyala namun saat tekan copy muncul kode E000001-0002 dan berbunyi derit di bagian fuser..."
                  className="w-full bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-3.5 text-xs text-slate-800 outline-none focus:border-slate-900"
                />
              </div>

              {/* Upload Foto Hasil Cetak Rusak / Monitor Error */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Foto Layar Monitor Error / Hasil Print Cacat (Opsional)
                </label>
                <div className="border-2 border-dashed border-slate-200 hover:border-slate-400 bg-[#F8FAFC] rounded-2xl p-5 text-center transition flex flex-col items-center justify-center">
                  <input
                    type="file"
                    id="service-photo"
                    accept="image/*"
                    onChange={(e) => e.target.files && setUploadedPhoto(e.target.files[0])}
                    className="hidden"
                  />
                  <label htmlFor="service-photo" className="cursor-pointer flex flex-col items-center">
                    {uploadedPhoto ? (
                      <>
                        <CheckCircle2 size={24} className="text-emerald-500 mb-1" />
                        <p className="text-xs font-bold text-slate-900">{uploadedPhoto.name}</p>
                        <p className="text-[10px] text-slate-400">Foto siap dilampirkan ke teknisi</p>
                      </>
                    ) : (
                      <>
                        <UploadCloud size={28} className="text-slate-400 mb-1.5" />
                        <p className="text-xs font-bold text-slate-700">
                          Klik untuk unggah foto hasil cetak rusak / kode error
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">JPG, PNG (Maksimal 10 MB)</p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Alamat Kunjungan & Waktu */}
          <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3 pb-5 mb-5 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                3
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Lokasi & Jadwal Kunjungan Teknisi</h3>
                <p className="text-xs text-slate-400">Tentukan alamat kantor / tempat usaha Anda</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Alamat Lengkap Kunjungan
                </label>
                <textarea
                  required
                  rows={2}
                  value={serviceAddress}
                  onChange={(e) => setServiceAddress(e.target.value)}
                  placeholder="Contoh: Jl. Diponegoro No. 88, Ruko Fotocopy Berkah (Lantai 1)..."
                  className="w-full bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-3.5 text-xs text-slate-800 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Preferensi Tanggal Kunjungan
                </label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Estimasi Biaya Pengecekan
                </label>
                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-3 text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span>Biaya Visit & Diagnosis</span>
                  <span className="text-orange-600">Rp 75.000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-black text-white rounded-2xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:opacity-60"
            >
              <Wrench size={15} />
              <span>{isSubmitting ? "Mendaftarkan Tiket..." : "Booking Kunjungan Teknisi Sekarang"}</span>
            </button>
          </div>
        </form>
      </div>
    </CustomerLayout>
  );
}
