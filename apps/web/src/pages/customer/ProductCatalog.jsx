import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomerLayout from "@/layouts/CustomerLayout";
import productService from "@/services/product.service";
import { useCart } from "@/hooks/useCart";
import {
  Search,
  ShoppingCart,
  SlidersHorizontal,
  ArrowUpDown,
  Loader2,
  Star,
  Package,
  Plus,
  Minus,
  Trash2,
  Check,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Kertas HVS A4 70 GSM",
    category: "Kertas",
    tag: "Terlaris",
    price: 55000,
    stock: 25,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600",
  },
  {
    id: 2,
    name: "Pulpen Standard AE7 (Box)",
    category: "Alat Tulis",
    tag: "Populer",
    price: 42000,
    stock: 100,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600",
  },
  {
    id: 3,
    name: "Buku Tulis Kiky 38 Lembar (10 Pcs)",
    category: "Buku",
    tag: "Sekolah",
    price: 38000,
    stock: 75,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600",
  },
  {
    id: 4,
    name: "Map Plastik Kancing Folio (Lusin)",
    category: "Perlengkapan Kantor",
    tag: "Kantor",
    price: 36000,
    stock: 40,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600",
  },
  {
    id: 5,
    name: "Pensil 2B Faber-Castell (Lusin)",
    category: "Alat Tulis",
    tag: "Ujian",
    price: 48000,
    stock: 12,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600",
  },
  {
    id: 6,
    name: "Kertas F4 70 GSM PaperOne",
    category: "Kertas",
    tag: "Terlaris",
    price: 60000,
    stock: 18,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600",
  },
  {
    id: 7,
    name: "Spidol Whiteboard Snowman (Set)",
    category: "Alat Tulis",
    tag: "Kantor",
    price: 28500,
    stock: 32,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600",
  },
  {
    id: 8,
    name: "Ordner Arsip Bantex Folio 7cm",
    category: "Perlengkapan Kantor",
    tag: "Arsip",
    price: 34000,
    stock: 8,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600",
  },
];

const CATEGORIES = [
  "Semua",
  "Kertas",
  "Alat Tulis",
  "Buku",
  "Perlengkapan Kantor",
];

function formatRupiah(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductCatalog() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(false);
  const [justAddedId, setJustAddedId] = useState(null);

  // Shared Persistent Cart State
  const {
    items: cart,
    cartItemCount,
    subtotal: cartTotal,
    addToCart: addProductToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const res = await productService.getAll();
        if (res && res.success && res.data && res.data.length > 0) {
          const formatted = res.data.map((p, idx) => ({
            id: p.id,
            name: p.name,
            category: p.category?.name || "Umum",
            tag: idx % 2 === 0 ? "Terlaris" : "Populer",
            price: Number(p.price),
            stock: p.stock,
            rating: 5.0,
            image:
              DEFAULT_PRODUCTS[idx % DEFAULT_PRODUCTS.length]?.image ||
              "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600",
          }));
          setProducts(formatted);
        }
      } catch (err) {
        setProducts(DEFAULT_PRODUCTS);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "Semua" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (sort === "lowest") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "highest") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, selectedCategory, sort]);

  // Cart operations
  const addToCart = (product) => {
    addProductToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      desc: product.category || "Perlengkapan ATK",
      image: product.image,
    });
  };

  const updateQty = (id, delta) => {
    if (delta > 0) {
      increaseQuantity(id);
    } else {
      decreaseQuantity(id);
    }
  };

  // Right Widget matching Gambar 1's right column
  const rightWidgetContent = (
    <div className="space-y-5">
      {/* 1. Quick Cart Widget */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <ShoppingCart size={17} className="text-gray-900" />
              <h3 className="font-bold text-gray-900 text-sm">Keranjang Belanja</h3>
            </div>
            <span className="bg-slate-900 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              {cartItemCount} item
            </span>
          </div>

          <div className="mt-4 space-y-3 max-h-56 overflow-y-auto pr-1">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-[#FAFAFA] border border-gray-100 rounded-xl p-2.5 text-xs"
                >
                  <div className="truncate pr-2">
                    <p className="font-bold text-gray-900 truncate max-w-[130px]">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {formatRupiah(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, -1)}
                      className="w-6 h-6 rounded-lg bg-white border border-gray-200/90 flex items-center justify-center text-gray-700 hover:text-black hover:border-gray-400 active:scale-90 transition shadow-2xs cursor-pointer"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="font-bold text-gray-900 text-xs w-5 text-center">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, 1)}
                      className="w-6 h-6 rounded-lg bg-white border border-gray-200/90 flex items-center justify-center text-gray-700 hover:text-black hover:border-gray-400 active:scale-90 transition shadow-2xs cursor-pointer"
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 text-center py-6">
                Keranjang masih kosong
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="text-gray-500 font-medium">Subtotal</span>
            <span className="font-black text-gray-900 text-sm">
              {formatRupiah(cartTotal)}
            </span>
          </div>
          <button
            type="button"
            disabled={cart.length === 0}
            onClick={() => navigate("/checkout")}
            className="w-full bg-slate-900 hover:bg-black disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl py-3 text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:cursor-not-allowed"
          >
            <span className={cart.length === 0 ? "text-gray-400 font-bold" : "text-white font-bold"}>
              Checkout Sekarang
            </span>
            <ArrowRight size={14} className={cart.length === 0 ? "text-gray-400 shrink-0" : "text-white shrink-0"} />
          </button>
        </div>
      </div>

      {/* 2. Monthly Target Widget (Matching Gambar 1) */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-100">
        <div className="flex items-center justify-between pb-2">
          <h3 className="font-bold text-gray-900 text-sm">Target Pasokan ATK</h3>
          <span className="text-gray-300">•••</span>
        </div>

        <div className="flex flex-col items-center justify-center my-3">
          <div className="relative w-40 h-20 flex items-end justify-center overflow-hidden">
            <div className="w-40 h-40 rounded-full border-[12px] border-gray-100 absolute top-0" />
            <div
              className="w-40 h-40 rounded-full border-[12px] border-[#FF6B35] absolute top-0"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                transform: "rotate(-25deg)",
              }}
            />
            <div className="relative z-10 text-center -mb-1">
              <span className="text-2xl font-black text-gray-900">82%</span>
            </div>
          </div>
          <p className="text-[11px] font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <span>↑ +5%</span> dari bulan lalu
          </p>
        </div>
        <p className="text-center text-[11px] text-gray-400">
          Ketersediaan stok gudang berada di level aman.
        </p>
      </div>

      {/* 3. Promo Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[28px] p-5 text-white shadow-xs">
        <span className="text-[10px] uppercase font-bold tracking-wider text-orange-400">
          Program Kantor
        </span>
        <h4 className="font-bold text-sm mt-1">Diskon Grosir 10%</h4>
        <p className="text-[11px] text-slate-300 mt-1">
          Pembelian kertas di atas 10 rim otomatis mendapatkan potongan harga mitra.
        </p>
      </div>
    </div>
  );

  return (
    <CustomerLayout
      headerTitle="Katalog ATK & Suku Cadang"
      searchPlaceholder="Cari nama produk ATK atau sparepart..."
      searchValue={search}
      onSearchChange={setSearch}
      cartCount={cartItemCount}
      rightWidget={rightWidgetContent}
    >
      <div className="space-y-6">
        {/* Filter Pills & Sort Bar */}
        <div className="bg-white rounded-[24px] p-4 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Filter Pills (Active: Dark Slate / Inactive: Light Gray) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "whitespace-nowrap px-4 py-2 rounded-full text-xs transition",
                    isSelected
                      ? "bg-slate-900 text-white font-bold shadow-xs"
                      : "bg-[#FAFAFA] hover:bg-gray-100 text-gray-600 border border-gray-200/70 font-medium"
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown size={14} className="text-gray-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-[#FAFAFA] border border-gray-200/80 rounded-full py-2 px-3 text-xs font-semibold text-gray-700 outline-none cursor-pointer focus:border-slate-900"
            >
              <option value="default">Urutan Default</option>
              <option value="lowest">Harga Terendah</option>
              <option value="highest">Harga Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Main Product Container */}
        <div className="bg-white rounded-[28px] p-6 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-extrabold text-base text-gray-900 tracking-tight">
                Daftar Produk ATK
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Menampilkan {filteredProducts.length} pilihan perlengkapan kantor
              </p>
            </div>

            {loading && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Loader2 size={13} className="animate-spin" />
                <span>Memuat...</span>
              </div>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-[22px] border border-gray-100 bg-[#FAFAFA] p-3 hover:shadow-md hover:border-gray-200 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Container with Dark Capsule Tag */}
                    <div className="aspect-4/3 rounded-[18px] bg-slate-100 overflow-hidden relative mb-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
                        {product.tag || product.category}
                      </span>
                    </div>

                    {/* Title & Category */}
                    <h4 className="font-bold text-gray-900 text-xs md:text-sm line-clamp-1">
                      {product.name}
                    </h4>

                    <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium mt-1">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star size={12} fill="currentColor" />
                        <span>{product.rating}</span>
                      </div>
                      <span className="text-gray-500">{product.category}</span>
                    </div>

                    {/* Price & Stock Badge */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                      <div className="text-sm md:text-base font-black text-gray-900 tracking-tight">
                        {formatRupiah(product.price)}
                      </div>
                      <span
                        className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-md",
                          product.stock <= 10
                            ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                        )}
                      >
                        {product.stock <= 10
                          ? `Sisa ${product.stock}`
                          : `Stok ${product.stock}`}
                      </span>
                    </div>
                  </div>

                  {/* Buy Button (Dark Slate / Black Solid - Neat Single Line + Feedback) */}
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(product);
                      setJustAddedId(product.id);
                      setTimeout(() => setJustAddedId(null), 1200);
                    }}
                    className={cn(
                      "mt-3.5 w-full rounded-xl py-2 px-2 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer",
                      justAddedId === product.id
                        ? "bg-emerald-600 text-white shadow-emerald-500/20"
                        : "bg-slate-900 hover:bg-black text-white"
                    )}
                  >
                    {justAddedId === product.id ? (
                      <>
                        <Check size={13} className="shrink-0 text-white" />
                        <span className="whitespace-nowrap font-bold text-white">Ditambahkan</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={13} className="shrink-0 text-white" />
                        <span className="whitespace-nowrap text-white font-medium">+ Keranjang</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <Package size={36} className="mx-auto text-gray-300 mb-2" />
              <p className="font-bold text-gray-700 text-sm">
                Produk tidak ditemukan
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Silakan ganti kata kunci pencarian atau pilih kategori lain.
              </p>
            </div>
          )}
        </div>
      </div>
    </CustomerLayout>
  );
}
