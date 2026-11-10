import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  Mail,
  Lock,
  AlertCircle,
  Loader2,
  CheckCircle2,
  FileText,
  Printer,
  Wrench,
  Boxes,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Load remembered email on mount if previously saved
  useEffect(() => {
    const savedEmail = localStorage.getItem("remembered_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  /**
   * Handle user login authentication and dynamic role-based redirection:
   * - admin    -> /admin/dashboard
   * - supplier -> /supplier/overview
   * - customer -> /katalog (or /customer/katalog)
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Save or clear remembered email
      if (rememberMe) {
        localStorage.setItem("remembered_email", email.trim());
      } else {
        localStorage.removeItem("remembered_email");
      }

      // Execute login through auth hook / API service
      const user = await login({ email: email.trim(), password });

      // Dynamic redirection according to authenticated user role
      const role = (user?.role || "").toUpperCase();

      if (role === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else if (role === "SUPPLIER") {
        navigate("/supplier/overview", { replace: true });
      } else {
        // Customer or default storefront redirect
        const target = location.state?.from?.pathname || "/katalog";
        navigate(target, { replace: true });
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Email atau kata sandi yang Anda masukkan salah. Silakan coba kembali."
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
          {/* Subtle Accent Ambient Glow */}
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-10 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Identity */}
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
                  Sistem Informasi Terpadu
                </p>
              </div>
            </Link>

            {/* Main Value Proposition */}
            <div className="mt-12 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700/80 text-[11px] font-bold text-orange-400">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                <span>Portal Resmi Pelayanan</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Solusi Digital Terpadu Kebutuhan ATK, Percetakan Dokumen, & Servis Mesin Fotocopy
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Akses cepat, transparan, dan terintegrasi untuk pelanggan retail, administrasi operasional toko, dan mitra pasokan logistik.
              </p>

              {/* Service Feature List */}
              <div className="space-y-3 pt-6 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-orange-400 shrink-0">
                    <FileText size={13} />
                  </div>
                  <span>Katalog Produk ATK & Kertas dengan Live Stock</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-orange-400 shrink-0">
                    <Printer size={13} />
                  </div>
                  <span>Kalkulator Estimasi Biaya Cetak & Jilid Otomatis</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-orange-400 shrink-0">
                    <Wrench size={13} />
                  </div>
                  <span>Booking Teknisi Servis Mesin & Suku Cadang Asli</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-orange-400 shrink-0">
                    <Boxes size={13} />
                  </div>
                  <span>Portal Purchase Order Mitra Logistik Terverifikasi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="relative z-10 mt-10 pt-6 border-t border-slate-800 text-[11px] text-slate-400 font-medium">
            © {new Date().getFullYear()} Fotocopy Cemerlang Indah. Semua hak dilindungi.
          </div>
        </div>

        {/* ================= SISI KANAN: FORM LOGIN ================= */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 lg:p-14 flex flex-col justify-center relative">
          
          {/* Header Navigation Shortcut */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Autentikasi Akun
            </span>
            <Link
              to="/katalog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>

          {/* Title & Subtitle */}
          <div className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Selamat Datang Kembali
            </h3>
            <p className="text-sm text-slate-500 font-normal mt-1.5">
              Masukkan email dan kata sandi Anda untuk mengakses akun
            </p>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-3 animate-fadeIn">
              <AlertCircle size={17} className="shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{error}</div>
            </div>
          )}

          {/* Standard Authentication Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Input Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Alamat Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={17}
                />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@domain.com / admin@cemerlang.com"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-150"
                />
              </div>
            </div>

            {/* Input Kata Sandi */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={17}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi Anda"
                  className="w-full pl-11 pr-11 py-3 bg-white border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors cursor-pointer"
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                />
                <span className="text-xs font-medium text-slate-600">
                  Ingat saya di perangkat ini
                </span>
              </label>

              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline transition-colors cursor-pointer"
              >
                Lupa Kata Sandi?
              </button>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl shadow-sm transition-all duration-150 text-sm flex items-center justify-center gap-2 disabled:opacity-60 mt-4 cursor-pointer active:scale-[0.99]"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              <span>{loading ? "Memverifikasi..." : "Masuk ke Akun"}</span>
            </button>
          </form>

          {/* Footer Registration Link */}
          <p className="text-center text-xs text-slate-500 mt-8 pt-6 border-t border-slate-100">
            Belum memiliki akun?{" "}
            <Link
              to="/register"
              className="font-semibold text-slate-900 underline hover:text-black transition-colors"
            >
              Daftar sebagai Pelanggan
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="pb-2 border-b border-slate-100">
              <h4 className="font-bold text-slate-900 text-base">
                Pemulihan Kata Sandi
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Fotocopy Cemerlang Indah Helpdesk
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Untuk alasan keamanan dan verifikasi data, permohonan reset kata sandi akun Admin, Supplier, maupun Pelanggan dilayani langsung oleh tim Helpdesk Operasional Toko.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
              <p className="font-bold text-slate-900">Kontak Resmi Operasional:</p>
              <p>• WhatsApp / Telepon: 0812-3456-7890</p>
              <p>• Email: bantuan@cemerlang.com</p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2.5 rounded-xl transition cursor-pointer"
              >
                Tutup Informasi
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
