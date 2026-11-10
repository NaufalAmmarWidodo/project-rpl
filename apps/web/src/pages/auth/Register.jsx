import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  UserRound,
  Mail,
  Phone,
  Lock,
  AlertCircle,
  Loader2,
  FileText,
  Printer,
  Wrench,
  Boxes,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register({ fullName, email, phone, password });
      navigate("/katalog");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Registrasi gagal, coba periksa kembali data Anda."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans antialiased text-slate-800">
      
      {/* Outer Split-Screen Card */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden grid lg:grid-cols-12 min-h-[640px]">
        
        {/* ================= SISI KIRI: BRANDING SHOWCASE ================= */}
        <div className="lg:col-span-5 bg-slate-900 p-8 sm:p-10 lg:p-12 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <Link to="/katalog" className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#F97316] to-[#FB923C] flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0 group-hover:scale-105 transition-transform duration-200">
                CI
              </div>
              <div>
                <h1 className="text-base font-extrabold text-white tracking-tight leading-tight">
                  FOTOCOPY CEMERLANG INDAH
                </h1>
                <p className="text-[10px] font-bold text-orange-400 tracking-wider uppercase mt-0.5">
                  Registrasi Pelanggan
                </p>
              </div>
            </Link>

            <div className="mt-12 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700/80 text-[11px] font-bold text-orange-400">
                <span>Daftar Akun Baru</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Mulai Kemudahan Pemesanan ATK & Percetakan Online
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Buat akun pelanggan untuk menghitung biaya cetak instan, belanja perlengkapan kantor, dan melacak tiket servis secara real-time.
              </p>

              <div className="space-y-3 pt-6 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-orange-400 shrink-0">
                    <FileText size={13} />
                  </div>
                  <span>Akses Riwayat & Tracking Pesanan Real-Time</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-orange-400 shrink-0">
                    <Printer size={13} />
                  </div>
                  <span>Unggah Berkas PDF/DOCX Siap Cetak Kapan Saja</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-orange-400 shrink-0">
                    <Wrench size={13} />
                  </div>
                  <span>Permintaan Servis Mesin Fotocopy Lebih Cepat</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-10 pt-6 border-t border-slate-800 text-[11px] text-slate-400 font-medium">
            © {new Date().getFullYear()} Fotocopy Cemerlang Indah.
          </div>
        </div>

        {/* ================= SISI KANAN: FORM REGISTRASI ================= */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 lg:p-14 flex flex-col justify-center relative">
          
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Pendaftaran Baru
            </span>
            <Link
              to="/katalog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Buat Akun Pelanggan
            </h3>
            <p className="text-sm text-slate-500 font-normal mt-1.5">
              Lengkapi formulir di bawah ini untuk membuat akun Anda
            </p>
          </div>

          {error && (
            <div className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-3">
              <AlertCircle size={17} className="shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Nama Lengkap
              </label>
              <div className="relative">
                <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Alamat Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nomor WhatsApp / HP
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="081234567890"
                    className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-11 pr-11 py-2.5 bg-white border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-md"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl shadow-sm transition-all duration-150 text-sm flex items-center justify-center gap-2 disabled:opacity-60 mt-4 cursor-pointer"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              <span>{loading ? "Mendaftarkan Akun..." : "Daftar Akun Baru"}</span>
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6 pt-5 border-t border-slate-100">
            Sudah memiliki akun?{" "}
            <Link
              to="/login"
              className="font-semibold text-slate-900 underline hover:text-black transition-colors"
            >
              Masuk ke Akun Anda
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
