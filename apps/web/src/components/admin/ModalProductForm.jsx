import React, { useState, useEffect, useRef } from "react";
import {
  X,
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon,
  Package,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PRODUCT_CATEGORIES = [
  "Kertas",
  "Alat Tulis",
  "Buku",
  "Perlengkapan Kantor",
  "Sparepart Fotocopy",
];

export default function ModalProductForm({
  isOpen,
  onClose,
  onSave,
  initialData = null,
}) {
  const isEditMode = Boolean(initialData && initialData.sku);

  // Form Fields State
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("Kertas");
  const [productType, setProductType] = useState("retail"); // 'retail' | 'sparepart'
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [minStock, setMinStock] = useState("10");
  const [unit, setUnit] = useState("Pcs");
  const [description, setDescription] = useState("");
  
  // Image Uploader State
  const [imagePreview, setImagePreview] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [showUrlField, setShowUrlField] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [errorNotice, setErrorNotice] = useState("");

  const fileInputRef = useRef(null);

  // Populate data when editing, or reset when adding
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setSku(initialData.sku || "");
      setCategory(initialData.category || "Kertas");
      setProductType(
        initialData.category === "Sparepart Fotocopy" || initialData.category === "Suku Cadang Mesin"
          ? "sparepart"
          : "retail"
      );
      setPrice(initialData.price?.toString() || "");
      setStock(initialData.stock?.toString() || "");
      setMinStock(initialData.minStock?.toString() || "10");
      setUnit(initialData.unit || "Pcs");
      setDescription(initialData.description || "");
      setImagePreview(initialData.image || "");
      setImageUrlInput(initialData.image || "");
    } else {
      // Default reset
      setName("");
      setSku(`SKU-${Date.now().toString().slice(-6)}`);
      setCategory("Kertas");
      setProductType("retail");
      setPrice("");
      setStock("");
      setMinStock("10");
      setUnit("Pcs");
      setDescription("");
      setImagePreview("");
      setImageUrlInput("");
    }
    setErrorNotice("");
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // Handle Drag & Drop Events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleImageFile(files[0]);
    }
  };

  // Convert File to Base64 preview
  const handleImageFile = (file) => {
    if (!file.type.startsWith("image/")) {
      setErrorNotice("Berkas yang dipilih harus berupa gambar (JPG, PNG, WebP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setImagePreview(uploadEvent.target.result);
      setErrorNotice("");
    };
    reader.readAsDataURL(file);
  };

  // Handle Submit & Validation
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorNotice("");

    // Validations
    if (!name.trim()) {
      setErrorNotice("Nama produk wajib diisi.");
      return;
    }
    if (!price || Number(price) <= 0) {
      setErrorNotice("Harga satuan harus lebih besar dari Rp 0.");
      return;
    }
    if (stock === "" || Number(stock) < 0) {
      setErrorNotice("Jumlah stok tidak boleh kosong atau negatif.");
      return;
    }
    if (!imagePreview) {
      setErrorNotice("Foto produk wajib diunggah atau gunakan URL gambar.");
      return;
    }

    const payload = {
      ...(initialData || {}),
      sku: sku || `SKU-${Date.now().toString().slice(-6)}`,
      name: name.trim(),
      category,
      type: productType,
      price: Number(price),
      stock: Number(stock),
      minStock: Number(minStock) || 5,
      unit: unit || "Pcs",
      description: description.trim(),
      image: imagePreview,
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-auto animate-in fade-in duration-200">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">
              {isEditMode ? "Edit Data Produk & Suku Cadang" : "Tambah Produk Baru ke Katalog"}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {isEditMode
                ? `Perbarui informasi, harga jual, dan stok untuk kode SKU: ${sku}`
                : "Lengkapi detail barang dan upload foto produk untuk inventaris toko"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Error Notice */}
        {errorNotice && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
            <AlertCircle size={16} className="shrink-0" />
            <span className="font-medium">{errorNotice}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* ================= 1. INTERACTIVE IMAGE UPLOADER ================= */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Foto Produk (Live Preview) *
            </label>

            {imagePreview ? (
              /* Live Preview Card */
              <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-3 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-28 h-28 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0 shadow-2xs">
                  <img
                    src={imagePreview}
                    alt="Preview Produk"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <p className="text-xs font-bold text-slate-800">Foto Siap Ditampilkan</p>
                  <p className="text-[11px] text-slate-400">
                    Foto produk akan otomatis digunakan pada katalog customer dan tabel admin.
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-white text-xs font-semibold text-slate-700 transition cursor-pointer"
                    >
                      Ganti Berkas
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview("");
                        setImageUrlInput("");
                      }}
                      className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-xs font-semibold text-rose-600 transition flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 size={13} />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Drag-and-Drop Area */
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2",
                  isDragging
                    ? "border-slate-900 bg-slate-100/80"
                    : "border-slate-200 hover:border-slate-400 bg-slate-50/50"
                )}
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-500">
                  <UploadCloud size={24} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Tarik & lepaskan file gambar di sini, atau{" "}
                    <span className="text-orange-600 underline">klik untuk memilih</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Mendukung format JPG, PNG, atau WebP (Maksimal 5MB)
                  </p>
                </div>
              </div>
            )}

            {/* Hidden Input File */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleImageFile(e.target.files[0]);
                }
              }}
            />

            {/* Option to use Image URL */}
            <div className="mt-2 text-right">
              <button
                type="button"
                onClick={() => setShowUrlField(!showUrlField)}
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 underline inline-flex items-center gap-1 cursor-pointer"
              >
                <LinkIcon size={12} />
                <span>{showUrlField ? "Sembunyikan input URL" : "Atau masukkan tautan URL gambar"}</span>
              </button>
            </div>

            {showUrlField && (
              <div className="mt-2 flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-900"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (imageUrlInput.trim()) {
                      setImagePreview(imageUrlInput.trim());
                    }
                  }}
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Terapkan URL
                </button>
              </div>
            )}
          </div>

          {/* ================= 2. FORM FIELDS DATA PRODUK ================= */}
          {/* Tipe Produk Selector (Pill Toggle) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Tipe Produk *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setProductType("retail");
                  if (category === "Sparepart Fotocopy") setCategory("Kertas");
                }}
                className={cn(
                  "p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer",
                  productType === "retail"
                    ? "bg-[#0F172A] text-white border-[#0F172A] shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                )}
              >
                <Package size={15} />
                <span>Barang Retail ATK / Kertas</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setProductType("sparepart");
                  setCategory("Sparepart Fotocopy");
                }}
                className={cn(
                  "p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer",
                  productType === "sparepart"
                    ? "bg-[#0F172A] text-white border-[#0F172A] shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                )}
              >
                <Wrench size={15} />
                <span>Sparepart Mesin Fotocopy</span>
              </button>
            </div>
          </div>

          {/* Nama Produk & Kategori */}
          <div className="grid sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Nama Produk / Suku Cadang *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Kertas HVS A4 70 GSM PaperOne / Toner NPG-51"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Kategori *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-slate-900 focus:bg-white"
              >
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Harga, Stok, Satuan, Min Stok */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Harga Jual (Rp) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                  Rp
                </span>
                <input
                  type="number"
                  min="0"
                  step="500"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="55.000"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Stok Awal *
              </label>
              <input
                type="number"
                min="0"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="45"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Batas Min Alert *
              </label>
              <input
                type="number"
                min="1"
                required
                value={minStock}
                onChange={(e) => setMinStock(e.target.value)}
                placeholder="10"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Satuan Barang
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-slate-900 focus:bg-white"
              >
                <option value="Rim">Rim</option>
                <option value="Pcs">Pcs</option>
                <option value="Box">Box</option>
                <option value="Lusin">Lusin</option>
                <option value="Unit">Unit</option>
                <option value="Tabung">Tabung</option>
                <option value="Roll">Roll</option>
              </select>
            </div>
          </div>

          {/* Deskripsi Singkat */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Deskripsi Singkat Produk (Opsional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tuliskan spesifikasi produk, kompatibilitas tipe mesin fotocopy, atau merk..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-slate-900 focus:bg-white transition resize-none"
            />
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl px-6 py-2.5 text-xs shadow-sm transition inline-flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <CheckCircle2 size={14} />
              <span>{isEditMode ? "Simpan Perubahan Produk" : "Simpan Produk Baru"}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
