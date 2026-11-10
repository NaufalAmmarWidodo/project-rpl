import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomerLayout from "@/layouts/CustomerLayout";
import CheckoutSummaryCard from "@/components/customer/CheckoutSummaryCard";
import { useCart } from "@/hooks/useCart";
import {
  ShieldCheck,
  CreditCard,
  Building,
  UploadCloud,
  CheckCircle2,
  Clock,
  ArrowRight,
  Package,
  MapPin,
  Truck,
  Store,
  ChevronRight,
  FileCheck,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const {
    items: cartItems,
    cartItemCount,
    subtotal,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    resetToDefault,
    clearCart,
  } = useCart();

  const [deliveryType, setDeliveryType] = useState("pickup"); // 'pickup' | 'delivery'
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bca"); // 'bca' | 'mandiri' | 'qris'
  const [uploadedProof, setUploadedProof] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState("");

  const deliveryFee = deliveryType === "delivery" ? 15000 : 0;
  const grandTotal = Math.max(0, subtotal + deliveryFee);

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedProof(e.target.files[0]);
      setOrderError("");
    }
  };

  const handleIncreaseQuantity = (id) => {
    increaseQuantity(id);
  };

  const handleDecreaseQuantity = (id) => {
    decreaseQuantity(id);
  };

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setOrderError("");

    if (cartItems.length === 0) {
      setOrderError("Keranjang belanja Anda masih kosong. Tambahkan produk sebelum checkout.");
      return;
    }

    if (deliveryType === "delivery" && !address.trim()) {
      setOrderError("Mohon masukkan alamat lengkap pengiriman untuk pengantaran kurir.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      navigate("/tracking/ORD-9022");
    }, 1000);
  };

  // Right Widget content: Interaktif CheckoutSummaryCard
  const rightWidgetContent = (
    <CheckoutSummaryCard
      items={cartItems}
      onIncreaseQuantity={handleIncreaseQuantity}
      onDecreaseQuantity={handleDecreaseQuantity}
      onRemoveItem={handleRemoveItem}
      onResetItems={resetToDefault}
      deliveryFee={deliveryFee}
      deliveryType={deliveryType}
      catalogUrl="/katalog"
    />
  );

  return (
    <CustomerLayout
      headerTitle="Checkout & Pembayaran"
      rightWidget={rightWidgetContent}
    >
      {/* Alert Error jika Ada */}
      {orderError && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200/80 flex items-center gap-3 text-red-800 text-xs">
          <AlertCircle size={18} className="text-red-600 shrink-0" />
          <p className="font-medium">{orderError}</p>
        </div>
      )}

      {/* Notice jika keranjang kosong */}
      {cartItems.length === 0 && (
        <div className="mb-6 p-5 rounded-2xl bg-amber-50/80 border border-amber-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h4 className="font-bold text-xs text-amber-900">
                Keranjang Checkout Kosong
              </h4>
              <p className="text-[11px] text-amber-700 mt-0.5">
                Silakan pilih produk ATK atau layanan cetak terlebih dahulu dari katalog.
              </p>
            </div>
          </div>
          <Link
            to="/katalog"
            className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition shadow-xs whitespace-nowrap"
          >
            Buka Katalog ATK
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="space-y-6">
        {/* Step 1: Opsi Pengambilan / Alamat Kirim */}
        <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3 pb-5 mb-5 border-b border-gray-100">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
              1
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">
                Metode Penerimaan Barang
              </h3>
              <p className="text-xs text-gray-400">
                Pilih bagaimana Anda ingin menerima pesanan Anda
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5">
            <button
              type="button"
              onClick={() => setDeliveryType("pickup")}
              className={cn(
                "p-4 rounded-2xl border text-left transition flex items-start gap-3.5 cursor-pointer",
                deliveryType === "pickup"
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-white hover:bg-slate-50 text-gray-800 border-gray-200/80"
              )}
            >
              <Store
                size={22}
                className={deliveryType === "pickup" ? "text-orange-400" : "text-gray-400"}
              />
              <div>
                <div className="font-bold text-xs">Ambil Sendiri di Toko (Pickup)</div>
                <div
                  className={cn(
                    "text-[11px] mt-0.5",
                    deliveryType === "pickup" ? "text-slate-300" : "text-gray-400"
                  )}
                >
                  Jl. Cemerlang Raya No. 12 • Gratis biaya antar
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDeliveryType("delivery")}
              className={cn(
                "p-4 rounded-2xl border text-left transition flex items-start gap-3.5 cursor-pointer",
                deliveryType === "delivery"
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-white hover:bg-slate-50 text-gray-800 border-gray-200/80"
              )}
            >
              <Truck
                size={22}
                className={deliveryType === "delivery" ? "text-orange-400" : "text-gray-400"}
              />
              <div>
                <div className="font-bold text-xs">Kirim ke Alamat (Kurir Lokal)</div>
                <div
                  className={cn(
                    "text-[11px] mt-0.5",
                    deliveryType === "delivery" ? "text-slate-300" : "text-gray-400"
                  )}
                >
                  Estimasi sampai hari yang sama • Rp 15.000
                </div>
              </div>
            </button>
          </div>

          {deliveryType === "delivery" && (
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Alamat Lengkap Pengiriman <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Tuliskan nama jalan, nomor kantor/rumah, RT/RW, dan patokan..."
                className="w-full bg-[#FAFAFA] border border-gray-200/80 rounded-2xl p-3.5 text-xs text-gray-900 outline-none focus:border-slate-900 focus:bg-white transition"
              />
            </div>
          )}

          <div className="mt-4">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Catatan untuk Toko / Operator Cetak (Opsional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Tolong jilid warna cover biru muda..."
              className="w-full bg-[#FAFAFA] border border-gray-200/80 rounded-xl px-4 py-2.5 text-xs text-gray-900 outline-none focus:border-slate-900 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Step 2: Rekening & Bukti Pembayaran */}
        <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3 pb-5 mb-5 border-b border-gray-100">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
              2
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">
                Pembayaran & Bukti Transfer
              </h3>
              <p className="text-xs text-gray-400">
                Transfer ke rekening toko dan unggah resi pembayaran
              </p>
            </div>
          </div>

          {/* Selector Metode */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setPaymentMethod("bca")}
              className={cn(
                "p-3.5 rounded-2xl border text-left transition cursor-pointer",
                paymentMethod === "bca"
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-white hover:bg-slate-50 text-gray-800 border-gray-200/80"
              )}
            >
              <p className="text-[11px] font-bold uppercase tracking-wider">Bank BCA</p>
              <p className="font-black text-sm mt-1">827-019-2811</p>
              <p
                className={cn(
                  "text-[10px] mt-0.5",
                  paymentMethod === "bca" ? "text-slate-300" : "text-gray-400"
                )}
              >
                a.n Cemerlang Indah
              </p>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("mandiri")}
              className={cn(
                "p-3.5 rounded-2xl border text-left transition cursor-pointer",
                paymentMethod === "mandiri"
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-white hover:bg-slate-50 text-gray-800 border-gray-200/80"
              )}
            >
              <p className="text-[11px] font-bold uppercase tracking-wider">Bank Mandiri</p>
              <p className="font-black text-sm mt-1">137-00-29182</p>
              <p
                className={cn(
                  "text-[10px] mt-0.5",
                  paymentMethod === "mandiri" ? "text-slate-300" : "text-gray-400"
                )}
              >
                a.n Cemerlang Indah
              </p>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("qris")}
              className={cn(
                "p-3.5 rounded-2xl border text-left transition cursor-pointer",
                paymentMethod === "qris"
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-white hover:bg-slate-50 text-gray-800 border-gray-200/80"
              )}
            >
              <p className="text-[11px] font-bold uppercase tracking-wider">QRIS Terpadu</p>
              <p className="font-black text-sm mt-1">Scan All E-Wallet</p>
              <p
                className={cn(
                  "text-[10px] mt-0.5",
                  paymentMethod === "qris" ? "text-slate-300" : "text-gray-400"
                )}
              >
                GoPay, OVO, Dana, ShopeePay
              </p>
            </button>
          </div>

          {/* Upload Bukti Transfer */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
              Unggah Resi / Bukti Transfer (JPG, PNG, PDF)
            </label>
            <div className="border-2 border-dashed border-slate-200 hover:border-slate-400 bg-[#FAFAFA] rounded-2xl p-6 text-center transition flex flex-col items-center justify-center">
              <input
                type="file"
                id="proof-upload"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label htmlFor="proof-upload" className="cursor-pointer flex flex-col items-center">
                {uploadedProof ? (
                  <>
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                      <CheckCircle2 size={22} />
                    </div>
                    <p className="text-xs font-bold text-gray-900">{uploadedProof.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {(uploadedProof.size / 1024).toFixed(1)} KB • Bukti terlampir
                    </p>
                  </>
                ) : (
                  <>
                    <UploadCloud size={30} className="text-gray-400 mb-2" />
                    <p className="text-xs font-bold text-gray-800">
                      Klik untuk mengunggah bukti bayar atau tarik berkas ke sini
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">Maksimal 10 MB</p>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || cartItems.length === 0}
            className={cn(
              "w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-black text-white rounded-2xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-3 active:scale-[0.98] cursor-pointer",
              (isSubmitting || cartItems.length === 0) &&
                "opacity-50 cursor-not-allowed hover:bg-slate-900"
            )}
          >
            <span className="text-white font-bold">
              {isSubmitting
                ? "Memproses Pesanan..."
                : cartItems.length === 0
                ? "Keranjang Belanja Masih Kosong"
                : "Konfirmasi & Selesaikan Pesanan"}
            </span>
            <ArrowRight size={16} className="text-white shrink-0" />
          </button>
        </div>
      </form>
    </CustomerLayout>
  );
}
