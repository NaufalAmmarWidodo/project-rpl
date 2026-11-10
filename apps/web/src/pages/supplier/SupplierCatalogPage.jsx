import React, { useState } from "react";
import SupplierLayout from "@/layouts/SupplierLayout";
import {
  Boxes,
  Search,
  Edit3,
  CheckCircle2,
  X,
  Package,
} from "lucide-react";

const INITIAL_SUPPLIER_CATALOG = [
  {
    code: "SUP-HVS-A4",
    name: "Kertas HVS A4 70 GSM (Pallet 100 Rim)",
    category: "Kertas Massal",
    wholesalePrice: 48000,
    storeRetailPrice: 55000,
    unit: "Rim",
    factoryStock: "Tersedia (>500 Rim)",
  },
  {
    code: "SUP-HVS-F4",
    name: "Kertas HVS F4 70 GSM (Pallet 100 Rim)",
    category: "Kertas Massal",
    wholesalePrice: 52000,
    storeRetailPrice: 60000,
    unit: "Rim",
    factoryStock: "Tersedia (Ready Pabrik)",
  },
  {
    code: "SUP-TONER-NPG51",
    name: "Toner Mesin Fotocopy NPG-51 Original",
    category: "Suku Cadang",
    wholesalePrice: 380000,
    storeRetailPrice: 450000,
    unit: "Tabung",
    factoryStock: "Tersedia (50 Tabung)",
  },
  {
    code: "SUP-DRUM-IR3235",
    name: "OPC Drum Unit Canon IR 3235 / 3245 High Grade",
    category: "Suku Cadang",
    wholesalePrice: 720000,
    storeRetailPrice: 850000,
    unit: "Unit",
    factoryStock: "Tersedia (20 Unit)",
  },
  {
    code: "SUP-ROLL-FUSER",
    name: "Lower Pressure Roller Canon IR 3300",
    category: "Suku Cadang",
    wholesalePrice: 140000,
    storeRetailPrice: 175000,
    unit: "Pcs",
    factoryStock: "Tersedia (35 Pcs)",
  },
];

export default function SupplierCatalogPage() {
  const [catalog, setCatalog] = useState(INITIAL_SUPPLIER_CATALOG);
  const [search, setSearch] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  const handleSavePrice = (e) => {
    e.preventDefault();
    setCatalog((prev) =>
      prev.map((c) => (c.code === editingItem.code ? editingItem : c))
    );
    setEditingItem(null);
  };

  const filtered = catalog.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SupplierLayout
      headerTitle="Katalog Pasokan Grosir ke Toko"
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Cari nama pasokan grosir, suku cadang, atau kode supplier..."
    >
      <div className="space-y-6">
        <div className="bg-white rounded-[28px] p-6 border border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Daftar Harga Grosir Pasokan
              </h3>
              <p className="text-xs text-slate-400">
                Harga acuan yang digunakan Admin Toko Cemerlang Indah saat menerbitkan Purchase Order (PO)
              </p>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              {catalog.length} Item Pasokan
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-3">Kode Supplier</th>
                  <th className="py-3 px-3">Nama Produk / Suku Cadang</th>
                  <th className="py-3 px-3">Kategori</th>
                  <th className="py-3 px-3">Harga Grosir (PO)</th>
                  <th className="py-3 px-3">Estimasi Jual Toko</th>
                  <th className="py-3 px-3">Kesiapan Gudang Mitra</th>
                  <th className="py-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.code} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-800">
                      {item.code}
                    </td>
                    <td className="py-3.5 px-3">
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="text-[10px] text-slate-400">Satuan: {item.unit}</p>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-600">
                      {item.category}
                    </td>
                    <td className="py-3.5 px-3 font-black text-slate-900">
                      Rp {item.wholesalePrice.toLocaleString("id-ID")}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-slate-400">
                      Rp {item.storeRetailPrice.toLocaleString("id-ID")}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-emerald-700">
                      <span className="bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md text-[11px]">
                        {item.factoryStock}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => setEditingItem({ ...item })}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-2xs ml-auto cursor-pointer"
                      >
                        <Edit3 size={12} />
                        <span>Update Harga</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Edit Harga Grosir */}
        {editingItem && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <form
              onSubmit={handleSavePrice}
              className="bg-white rounded-[28px] max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Perbarui Harga Grosir</h4>
                  <p className="text-xs text-slate-400">{editingItem.name}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Harga Pasokan Grosir (Rp / {editingItem.unit})
                </label>
                <input
                  type="number"
                  required
                  value={editingItem.wholesalePrice}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      wholesalePrice: Number(e.target.value),
                    })
                  }
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 outline-none focus:border-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-black transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <CheckCircle2 size={13} />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </SupplierLayout>
  );
}
