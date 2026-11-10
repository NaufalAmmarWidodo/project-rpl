import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ShieldCheck,
  ArrowRight,
  PackageX,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Format angka ke format Rupiah standar
 */
function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Komponen Rincian Tagihan Interaktif pada Halaman Checkout
 * Mendukung kontrol kuantitas (- / +), tombol hapus instan, empty state,
 * serta kalkulasi reaktif real-time sesuai Clean Slate Design System.
 */
export default function CheckoutSummaryCard({
  items = [],
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
  onResetItems,
  deliveryFee = 0,
  deliveryType = "pickup",
  discount = 0,
  catalogUrl = "/katalog",
  className = "",
}) {
  const totalItems = items.reduce((sum, item) => sum + (item.qty || 0), 0);
  const subtotal = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 0),
    0
  );
  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);

  return (
    <div className={cn("space-y-5", className)}>
      {/* 1. KARTU UTAMA RINCIAN TAGIHAN */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-100">
        {/* Header Kartu */}
        <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={17} className="text-gray-900" />
            <h3 className="font-bold text-gray-900 text-sm">Rincian Tagihan</h3>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
            {totalItems} Item
          </span>
        </div>

        {/* Daftar Item Checkout / Empty State */}
        {items.length === 0 ? (
          <div className="py-8 px-2 text-center flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
              <PackageX size={26} />
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              Keranjang checkout Anda kosong
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-[220px]">
              Belum ada produk atau pesanan cetak yang akan diproses.
            </p>

            <div className="mt-4 flex flex-col gap-2 w-full max-w-[200px]">
              <Link
                to={catalogUrl}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition shadow-xs active:scale-95"
              >
                <span className="text-white font-bold">Kembali ke Katalog ATK</span>
                <ArrowRight size={14} className="text-white shrink-0" />
              </Link>

              {onResetItems && (
                <button
                  type="button"
                  onClick={onResetItems}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[11px] font-medium rounded-xl border border-slate-200/80 transition"
                >
                  <RotateCcw size={12} />
                  <span>Muat Contoh Barang</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-3.5 divide-y divide-gray-50">
            {items.map((item) => {
              const itemTotal = (item.price || 0) * (item.qty || 0);
              const maxStock = item.stock ?? 999;
              const isAtMaxStock = item.qty >= maxStock;

              return (
                <div
                  key={item.id}
                  className="pt-3.5 first:pt-0 flex flex-col gap-2.5 transition-all"
                >
                  {/* Info Produk & Tombol Hapus */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-900 text-xs truncate leading-snug">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-gray-400 truncate mt-0.5">
                        {formatRupiah(item.price)}
                        {item.desc ? ` • ${item.desc}` : ""}
                      </p>
                    </div>

                    {/* Tombol Hapus Instan (Trash) */}
                    <button
                      type="button"
                      title="Hapus produk dari checkout"
                      onClick={() => onRemoveItem && onRemoveItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Quantity Counter & Subtotal Baris */}
                  <div className="flex items-center justify-between pt-1">
                    {/* Minimalist Counter Button */}
                    <div className="flex items-center bg-slate-50/80 rounded-xl p-0.5 border border-slate-200/60">
                      {/* Tombol Minus (-) */}
                      <button
                        type="button"
                        aria-label="Kurangi kuantitas"
                        onClick={() =>
                          onDecreaseQuantity && onDecreaseQuantity(item.id)
                        }
                        className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-700 text-xs font-bold transition-colors active:scale-95 cursor-pointer shadow-2xs"
                      >
                        <Minus size={11} />
                      </button>

                      {/* Display Angka Kuantitas */}
                      <span className="text-sm font-semibold text-slate-900 px-3 min-w-[32px] text-center select-none">
                        {item.qty}
                      </span>

                      {/* Tombol Plus (+) */}
                      <button
                        type="button"
                        aria-label="Tambah kuantitas"
                        disabled={isAtMaxStock}
                        title={
                          isAtMaxStock
                            ? `Batas stok tercapai (${maxStock})`
                            : "Tambah barang"
                        }
                        onClick={() =>
                          onIncreaseQuantity && onIncreaseQuantity(item.id)
                        }
                        className={cn(
                          "w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-700 text-xs font-bold transition-colors active:scale-95 cursor-pointer shadow-2xs",
                          isAtMaxStock &&
                            "opacity-40 cursor-not-allowed hover:bg-white"
                        )}
                      >
                        <Plus size={11} />
                      </button>
                    </div>

                    {/* Subtotal Item */}
                    <div className="text-right">
                      <span className="font-bold text-gray-900 text-xs">
                        {formatRupiah(itemTotal)}
                      </span>
                      {isAtMaxStock && item.stock && item.stock < 999 && (
                        <p className="text-[9px] text-amber-600 font-medium">
                          Maks. stok
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Ringkasan Finansial Real-time */}
        <div className="mt-5 pt-4 border-t border-gray-100 space-y-2.5 text-xs">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal Produk & Layanan</span>
            <span className="font-semibold text-gray-900">
              {formatRupiah(subtotal)}
            </span>
          </div>

          <div className="flex justify-between text-gray-500">
            <span>Biaya Pengiriman</span>
            <span className="font-semibold text-gray-900">
              {deliveryFee === 0
                ? "Gratis (Ambil Sendiri)"
                : formatRupiah(deliveryFee)}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Potongan Diskon</span>
              <span className="font-semibold">-{formatRupiah(discount)}</span>
            </div>
          )}

          <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
            <span className="font-bold text-gray-900 text-xs sm:text-sm">
              Total Pembayaran
            </span>
            <span className="text-xl font-black text-gray-900 tracking-tight">
              {formatRupiah(grandTotal)}
            </span>
          </div>
        </div>
      </div>

      {/* 2. JAMINAN KEAMANAN TRANSAKSI */}
      <div className="bg-white rounded-[28px] p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900">
              Pembayaran Terverifikasi
            </h4>
            <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
              Admin Cemerlang Indah akan memvalidasi bukti transfer dalam kurun
              waktu 5-15 menit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
