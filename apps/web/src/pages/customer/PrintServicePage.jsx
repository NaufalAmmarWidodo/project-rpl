import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomerLayout from "@/layouts/CustomerLayout";
import PrintCalculator from "@/components/customer/PrintCalculator";
import { useCart } from "@/hooks/useCart";
import {
  Printer,
  ShieldCheck,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  CheckCircle,
  MessageSquare,
  Truck,
} from "lucide-react";

export default function PrintServicePage() {
  const [orderNotice, setOrderNotice] = useState(null);
  const { addToCart } = useCart();

  const handleAddToCart = (orderData) => {
    addToCart({
      id: "PRINT-" + Date.now(),
      name: `Cetak ${orderData.selectedService.toUpperCase()}`,
      desc: `${orderData.pageCount} hal • ${orderData.paperSize} • ${orderData.colorMode === "color" ? "Warna" : "B&W"}`,
      price: orderData.estimatedTotal,
      stock: 99,
      type: "Percetakan",
      category: "Layanan Cetak",
    });

    setOrderNotice(
      `Pesanan cetak (${orderData.selectedService.toUpperCase()} - ${
        orderData.pageCount
      } hal) senilai Rp ${orderData.estimatedTotal.toLocaleString(
        "id-ID"
      )} berhasil dimasukkan ke keranjang belanja!`
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Right Widget matching Gambar 1's right column design
  const rightWidgetContent = (
    <div className="space-y-5">
      {/* 1. SLA / Estimasi Waktu */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-100">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-sm">Estimasi Pengerjaan</h3>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="mt-4 space-y-3.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <Printer size={15} className="text-gray-400" />
              <span>Dokumen HVS Biasa</span>
            </div>
            <span className="font-bold text-gray-900 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
              ~ 15 Menit
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <FileCheck size={15} className="text-gray-400" />
              <span>Jilid Skripsi / Spiral</span>
            </div>
            <span className="font-bold text-gray-900 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
              1 - 2 Jam
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <Clock size={15} className="text-gray-400" />
              <span>Banner & Spanduk</span>
            </div>
            <span className="font-bold text-gray-900 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
              Hari yang Sama
            </span>
          </div>
        </div>
      </div>

      {/* 2. On-Time Delivery Rate (Matching Gambar 1's gauge) */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-100">
        <div className="flex items-center justify-between pb-2">
          <h3 className="font-bold text-gray-900 text-sm">Tingkat Ketepatan Waktu</h3>
          <span className="text-gray-300">•••</span>
        </div>

        <div className="flex flex-col items-center justify-center my-4">
          {/* Radial semi-circle meter */}
          <div className="relative w-40 h-20 flex items-end justify-center overflow-hidden">
            <div className="w-40 h-40 rounded-full border-[12px] border-gray-100 absolute top-0" />
            <div
              className="w-40 h-40 rounded-full border-[12px] border-[#FF6B35] absolute top-0"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                transform: "rotate(-10deg)",
              }}
            />
            <div className="relative z-10 text-center -mb-1">
              <span className="text-2xl font-black text-gray-900">98%</span>
            </div>
          </div>
          <p className="text-[11px] font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <span>↑ +3%</span> dari bulan lalu
          </p>
        </div>

        <p className="text-center text-[11px] text-gray-400">
          98% pesanan cetak diambil sesuai waktu yang dijanjikan.
        </p>
      </div>

      {/* 3. Bantuan Operator Cetak */}
      <div className="bg-white rounded-[28px] p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center">
            <MessageSquare size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900">Operator Percetakan</h4>
            <p className="text-[11px] text-gray-400">Konsultasi format & ukuran</p>
          </div>
        </div>
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-full transition shadow-2xs"
        >
          Chat WA
        </a>
      </div>
    </div>
  );

  return (
    <CustomerLayout
      headerTitle="Layanan Cetak & Percetakan"
      searchPlaceholder="Cari tipe cetak, ukuran kertas, atau finishing jilid..."
      rightWidget={rightWidgetContent}
    >
      <div className="space-y-6">
        {/* Order Notice Alert */}
        {orderNotice && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-600 shrink-0" />
              <span>{orderNotice}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/checkout"
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition shadow-2xs"
              >
                Lanjut ke Checkout →
              </Link>
              <button
                type="button"
                onClick={() => setOrderNotice(null)}
                className="text-emerald-700 hover:text-emerald-950 font-bold underline text-xs cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* 1. Master Print Calculator */}
        <PrintCalculator onAddToCart={handleAddToCart} />

        {/* 2. Three Feature Cards matching the Gambar 1 tactile aesthetic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <Printer size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-xs md:text-sm">
                Mesin Produksi Digital
              </h3>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                Kualitas warna tajam, hasil cetak jernih tanpa noda, dan kertas gramasi tinggi.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-xs md:text-sm">
                Kerahasiaan Berkas
              </h3>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                Dokumen Anda dijamin aman dan otomatis dimusnahkan dari server pengerjaan.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <Truck size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-xs md:text-sm">
                Pickup & Delivery
              </h3>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                Ambil di toko saat selesai atau kirim langsung dengan kurir ke alamat Anda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
