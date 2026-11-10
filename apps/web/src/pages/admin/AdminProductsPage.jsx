import React, { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import ModalProductForm from "@/components/admin/ModalProductForm";
import {
  Package,
  Search,
  Plus,
  Minus,
  AlertTriangle,
  CheckCircle2,
  Edit3,
  Trash2,
  Boxes,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const INITIAL_INVENTORY = [
  {
    sku: "ATK-HVS-A4",
    name: "Kertas HVS A4 70 GSM PaperOne",
    category: "Kertas",
    type: "retail",
    unit: "Rim",
    price: 55000,
    stock: 45,
    minStock: 15,
    description: "Kertas fotocopy putih bersih 70 GSM, hasil cetak tajam anti jam.",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600",
  },
  {
    sku: "ATK-HVS-F4",
    name: "Kertas HVS F4 70 GSM Sinar Dunia",
    category: "Kertas",
    type: "retail",
    unit: "Rim",
    price: 60000,
    stock: 5, // LOW STOCK
    minStock: 15,
    description: "Kertas folio F4 kualitas premium untuk dokumen legal dan perkantoran.",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600",
  },
  {
    sku: "ATK-PEN-AE7",
    name: "Pulpen Standard AE7 Hitam (Box 12 Pcs)",
    category: "Alat Tulis",
    type: "retail",
    unit: "Box",
    price: 42000,
    stock: 60,
    minStock: 10,
    description: "Pulpen tinta gel hitam pekat anti bocor, ujung jarum 0.5mm.",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600",
  },
  {
    sku: "SP-TONER-NPG51",
    name: "Toner Mesin Fotocopy NPG-51 Original",
    category: "Sparepart Fotocopy",
    type: "sparepart",
    unit: "Tabung",
    price: 450000,
    stock: 12,
    minStock: 5,
    description: "Toner bubuk hitam asli untuk Canon IR 2520, IR 2525, IR 2530.",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600",
  },
  {
    sku: "SP-DRUM-IR3235",
    name: "Drum Unit Fotocopy Canon IR 3235 / 3245",
    category: "Sparepart Fotocopy",
    type: "sparepart",
    unit: "Unit",
    price: 850000,
    stock: 4, // LOW STOCK
    minStock: 6,
    description: "OPC Drum silinder sensitif cahaya kualitas cetak hingga 80.000 lembar.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600",
  },
  {
    sku: "SP-ROLL-FUSER",
    name: "Roll Fuser Bawah Canon IR 3300 / 4570",
    category: "Sparepart Fotocopy",
    type: "sparepart",
    unit: "Pcs",
    price: 175000,
    stock: 8,
    minStock: 4,
    description: "Lower pressure roller tahan panas tinggi untuk unit pemanas mesin fotocopy.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600",
  },
];

export default function AdminProductsPage() {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [successToast, setSuccessToast] = useState("");

  const handleUpdateStock = (sku, delta) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.sku === sku
          ? { ...item, stock: Math.max(0, item.stock + delta) }
          : item
      )
    );
  };

  const handleOpenAddModal = () => {
    setModalItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setModalItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (sku) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini dari katalog?")) {
      setInventory((prev) => prev.filter((p) => p.sku !== sku));
      showToast("Produk berhasil dihapus dari inventaris.");
    }
  };

  const handleSaveProduct = (productData) => {
    const exists = inventory.some((item) => item.sku === productData.sku);

    if (exists) {
      // Update existing
      setInventory((prev) =>
        prev.map((item) => (item.sku === productData.sku ? productData : item))
      );
      showToast(`Perubahan data "${productData.name}" berhasil disimpan.`);
    } else {
      // Create new
      setInventory([productData, ...inventory]);
      showToast(`Produk baru "${productData.name}" berhasil ditambahkan ke katalog.`);
    }
  };

  const showToast = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => {
      setSuccessToast("");
    }, 3500);
  };

  const filtered = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout
      headerTitle="Inventaris Produk & Stok Suku Cadang"
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Cari nama barang, kode SKU, atau kategori..."
      headerAction={
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <Plus size={15} />
          <span>Tambah Produk Baru</span>
        </button>
      }
    >
      <div className="space-y-6">

        {/* Success Alert Toast */}
        {successToast && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-2xs animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={17} className="text-emerald-600 shrink-0" />
              <span>{successToast}</span>
            </div>
            <button
              type="button"
              onClick={() => setSuccessToast("")}
              className="text-emerald-600 hover:text-emerald-900 text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* Category Filter Pills Bar */}
        <div className="bg-white rounded-[24px] p-4 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2">
            {["Semua", "Kertas", "Alat Tulis", "Sparepart Fotocopy"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer",
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-[#F8FAFC] text-slate-600 border border-slate-200/70 hover:bg-slate-100"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full shrink-0">
            {filtered.length} dari {inventory.length} Master SKU
          </span>
        </div>

        {/* Main Products Inventory Table Card */}
        <div className="bg-white rounded-[28px] p-6 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 mb-4 gap-2">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Katalog Inventaris & Pengendalian Stok Toko
              </h3>
              <p className="text-xs text-slate-400">
                Kelola foto produk, harga jual retail, monitor batas minimum stok, dan penyesuaian kuantitas
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <Plus size={14} />
              <span>Tambah SKU Baru</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-3">Produk</th>
                  <th className="py-3 px-3">Kode SKU</th>
                  <th className="py-3 px-3">Kategori</th>
                  <th className="py-3 px-3">Harga Jual</th>
                  <th className="py-3 px-3">Batas Min</th>
                  <th className="py-3 px-3">Stok Gudang</th>
                  <th className="py-3 px-3 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => {
                  const isLow = item.stock <= item.minStock;

                  return (
                    <tr key={item.sku} className="hover:bg-slate-50/80 transition">
                      {/* Photo Thumbnail + Name */}
                      <td className="py-3 px-3 max-w-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-2xs">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <ImageIcon size={18} />
                              </div>
                            )}
                          </div>
                          <div className="truncate">
                            <p className="font-bold text-slate-900 text-xs truncate">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                              Satuan: {item.unit}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3 font-mono font-bold text-slate-700">
                        {item.sku}
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-semibold text-slate-600 bg-slate-100/90 px-2.5 py-1 rounded-md text-[11px]">
                          {item.category}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-black text-slate-900 text-xs">
                        Rp {item.price.toLocaleString("id-ID")}
                      </td>

                      <td className="py-3 px-3 font-bold text-slate-500">
                        {item.minStock} {item.unit}
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "text-xs font-black px-2.5 py-1 rounded-md",
                              isLow
                                ? "bg-rose-50 text-rose-700 border border-rose-200"
                                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            )}
                          >
                            {item.stock} {item.unit}
                          </span>
                          {isLow && (
                            <span className="text-[10px] font-bold text-rose-600 flex items-center gap-0.5">
                              <AlertTriangle size={12} /> Kritis
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Quick Adjustments & Edit / Delete */}
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleUpdateStock(item.sku, -1)}
                            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-100 transition shadow-2xs cursor-pointer"
                            title="Kurang Stok 1"
                          >
                            <Minus size={11} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateStock(item.sku, 1)}
                            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-100 transition shadow-2xs cursor-pointer"
                            title="Tambah Stok 1"
                          >
                            <Plus size={11} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition ml-1 cursor-pointer"
                            title="Edit Data & Gambar Produk"
                          >
                            <Edit3 size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(item.sku)}
                            className="p-1.5 rounded-lg border border-slate-200 text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                            title="Hapus Produk"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Form Tambah / Edit Produk dengan Upload Gambar */}
        <ModalProductForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
          initialData={modalItem}
        />

      </div>
    </AdminLayout>
  );
}
