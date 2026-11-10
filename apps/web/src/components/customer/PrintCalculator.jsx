import React, { useState, useId } from "react";
import {
  UploadCloud,
  CheckCircle2,
  Calculator,
  FileCheck,
  Plus,
  Minus,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICE_TYPES = [
  {
    id: "hvs",
    name: "Print Dokumen HVS",
    desc: "Tugas, modul & skripsi",
    ratePerPageBW: 500,
    ratePerPageColor: 1500,
  },
  {
    id: "jilid",
    name: "Jilid Spiral & Softcover",
    desc: "Buku & laporan resmi",
    ratePerPageBW: 500,
    ratePerPageColor: 1500,
    finishingFee: 15000,
  },
  {
    id: "banner",
    name: "Banner & Spanduk",
    desc: "Bahan flexi outdoor",
    ratePerSqMeter: 25000,
  },
  {
    id: "foto",
    name: "Cetak Foto Glossy",
    desc: "Kertas foto tebal 230gsm",
    ratePerPageBW: 5000,
    ratePerPageColor: 5000,
  },
];

const PAPER_SIZES = ["A4", "F4 / Folio", "A3", "A3+"];

export default function PrintCalculator({ onAddToCart }) {
  const [selectedService, setSelectedService] = useState("hvs");
  const [paperSize, setPaperSize] = useState("A4");
  const [colorMode, setColorMode] = useState("bw"); // 'bw' | 'color'
  const [pageCount, setPageCount] = useState(10);
  const [copies, setCopies] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputId = useId();

  // Dynamic price calculation
  const calculateEstimate = () => {
    const service = SERVICE_TYPES.find((s) => s.id === selectedService);
    if (!service) return 0;

    let base = 0;
    if (selectedService === "banner") {
      base = service.ratePerSqMeter || 25000;
    } else {
      const perPage =
        colorMode === "color"
          ? service.ratePerPageColor
          : service.ratePerPageBW;
      base = perPage * pageCount;
      if (service.finishingFee) {
        base += service.finishingFee;
      }
    }
    return base * copies;
  };

  const estimatedTotal = calculateEstimate();

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
      {/* Title Header */}
      <div className="flex items-center justify-between pb-5 mb-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B35] flex items-center justify-center font-bold">
            <Calculator size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              Kalkulator Estimasi Cetak
            </h2>
            <p className="text-xs text-gray-400">
              Pilih spesifikasi dan estimasi biaya secara otomatis
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] font-semibold">
          <Sparkles size={12} className="text-[#FF6B35]" />
          Harga Real-time
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Left Form: Options */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Service Type Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
              Tipe Layanan Percetakan
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SERVICE_TYPES.map((type) => {
                const isSelected = selectedService === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedService(type.id)}
                    className={cn(
                      "p-3.5 rounded-2xl border text-left transition-all relative",
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-white hover:bg-slate-50 text-gray-800 border-gray-200/80"
                    )}
                  >
                    <div className="font-bold text-xs">{type.name}</div>
                    <div
                      className={cn(
                        "text-[10px] mt-0.5",
                        isSelected ? "text-slate-300" : "text-gray-400"
                      )}
                    >
                      {type.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Paper Size & Color Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Paper Size Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
                Ukuran Kertas
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {PAPER_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setPaperSize(size)}
                    className={cn(
                      "py-2.5 rounded-xl border text-xs font-bold transition text-center",
                      paperSize === size
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                        : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200/80"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Mode Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
                Warna Cetak
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setColorMode("bw")}
                  className={cn(
                    "py-2.5 px-3 rounded-xl border text-xs font-bold transition",
                    colorMode === "bw"
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200/80"
                  )}
                >
                  Hitam Putih
                </button>
                <button
                  type="button"
                  onClick={() => setColorMode("color")}
                  className={cn(
                    "py-2.5 px-3 rounded-xl border text-xs font-bold transition",
                    colorMode === "color"
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200/80"
                  )}
                >
                  Full Color
                </button>
              </div>
            </div>
          </div>

          {/* 3. Page Count & Copies (with tactile stepper controls) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                Jumlah Halaman
              </label>
              <div className="flex items-center bg-[#FAFAFA] border border-gray-200/80 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setPageCount(Math.max(1, pageCount - 1))}
                  className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-2xs transition"
                >
                  <Minus size={14} />
                </button>
                <input
                  type="number"
                  min="1"
                  value={pageCount}
                  onChange={(e) =>
                    setPageCount(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="flex-1 bg-transparent text-center font-bold text-sm text-gray-900 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setPageCount(pageCount + 1)}
                  className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-2xs transition"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                Jumlah Rangkap (Copies)
              </label>
              <div className="flex items-center bg-[#FAFAFA] border border-gray-200/80 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setCopies(Math.max(1, copies - 1))}
                  className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-2xs transition"
                >
                  <Minus size={14} />
                </button>
                <input
                  type="number"
                  min="1"
                  value={copies}
                  onChange={(e) =>
                    setCopies(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="flex-1 bg-transparent text-center font-bold text-sm text-gray-900 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setCopies(copies + 1)}
                  className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-2xs transition"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form: Dropzone & Clean Estimation Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          {/* Drag & Drop File Upload */}
          <div>
            <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
              Unggah Berkas Dokumen
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={cn(
                "border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[175px]",
                isDragging
                  ? "border-slate-900 bg-slate-100/70"
                  : uploadedFile
                  ? "border-emerald-400 bg-emerald-50/40"
                  : "border-slate-200 hover:border-slate-400 bg-[#FAFAFA]"
              )}
            >
              <input
                type="file"
                id={fileInputId}
                onChange={handleFileChange}
                accept=".pdf,.docx,.doc,.zip,.rar,.png,.jpg"
                className="hidden"
              />
              <label
                htmlFor={fileInputId}
                className="cursor-pointer flex flex-col items-center w-full"
              >
                {uploadedFile ? (
                  <>
                    <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                      <CheckCircle2 size={24} />
                    </div>
                    <p className="text-xs font-bold text-gray-900 truncate max-w-[240px]">
                      {uploadedFile.name}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Siap
                      diproses
                    </p>
                    <span className="mt-2 text-[10px] font-bold text-slate-700 bg-white border border-gray-200 px-2.5 py-1 rounded-md shadow-2xs">
                      Ganti Berkas
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-11 h-11 rounded-full bg-white border border-gray-200/80 shadow-2xs text-gray-400 flex items-center justify-center mb-2.5">
                      <UploadCloud size={22} className="text-gray-500" />
                    </div>
                    <p className="text-xs font-bold text-gray-800">
                      Tarik file ke sini atau{" "}
                      <span className="text-gray-900 underline font-extrabold">
                        telusuri
                      </span>
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      PDF, DOCX, ZIP, JPG (Maksimal 50 MB)
                    </p>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Pricing Estimation Summary */}
          <div className="bg-[#FAFAFA] rounded-2xl p-5 border border-gray-200/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span className="font-medium">Total Perkiraan Biaya:</span>
              <span className="font-semibold text-gray-800">
                {pageCount} hal × {copies} rangkap
              </span>
            </div>

            <div className="text-3xl font-black text-gray-900 tracking-tight mt-1">
              Rp {estimatedTotal.toLocaleString("id-ID")}
            </div>

            <p className="text-[11px] text-gray-400 mt-1 mb-4">
              *Harga sudah termasuk PPN & finishing standar.
            </p>

            <button
              type="button"
              onClick={() =>
                onAddToCart &&
                onAddToCart({
                  selectedService,
                  paperSize,
                  colorMode,
                  pageCount,
                  copies,
                  estimatedTotal,
                  file: uploadedFile,
                })
              }
              className="w-full bg-slate-900 hover:bg-black text-white py-3.5 rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
            >
              <FileCheck size={16} className="text-white shrink-0" />
              <span className="text-white font-bold">Tambahkan ke Pesanan Cetak</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
