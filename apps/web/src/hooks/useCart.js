import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "cemerlang_cart_items";
const CART_EVENT = "ci_cart_updated";

export const INITIAL_CART_ITEMS = [
  {
    id: 1,
    name: "Kertas HVS A4 70 GSM",
    desc: "Rim 500 Lembar",
    price: 55000,
    qty: 2,
    stock: 25,
    type: "ATK",
    category: "Kertas",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600",
  },
  {
    id: 2,
    name: "Pulpen Standard AE7 (Box)",
    desc: "12 pcs warna hitam",
    price: 42000,
    qty: 1,
    stock: 100,
    type: "ATK",
    category: "Alat Tulis",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600",
  },
  {
    id: 3,
    name: "Jasa Print & Jilid Skripsi",
    desc: "65 hal • Full Color • Hardcover",
    price: 95000,
    qty: 1,
    stock: 999,
    type: "Percetakan",
    category: "Percetakan",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600",
  },
];

function getStoredCart() {
  if (typeof window === "undefined") return INITIAL_CART_ITEMS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First time initialization
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CART_ITEMS));
      return INITIAL_CART_ITEMS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_CART_ITEMS;
  } catch (err) {
    console.error("Gagal membaca cart dari localStorage:", err);
    return INITIAL_CART_ITEMS;
  }
}

function persistCart(newCart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCart));
    window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: newCart }));
  } catch (err) {
    console.error("Gagal menyimpan cart ke localStorage:", err);
  }
}

export function useCart() {
  const [items, setItems] = useState(getStoredCart);

  useEffect(() => {
    const handleCartSync = (event) => {
      if (event.detail) {
        setItems(event.detail);
      } else {
        setItems(getStoredCart());
      }
    };

    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        setItems(getStoredCart());
      }
    };

    window.addEventListener(CART_EVENT, handleCartSync);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(CART_EVENT, handleCartSync);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const addToCart = useCallback((product, qtyToAdd = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      let updated;
      if (existingIndex > -1) {
        updated = prevItems.map((item, idx) => {
          if (idx === existingIndex) {
            const maxStock = item.stock || product.stock || 999;
            const targetQty = Math.min(item.qty + qtyToAdd, maxStock);
            return { ...item, qty: targetQty };
          }
          return item;
        });
      } else {
        updated = [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            desc: product.desc || product.category || "Produk Cemerlang Indah",
            price: Number(product.price) || 0,
            qty: qtyToAdd,
            stock: product.stock ?? 999,
            type: product.type || "ATK",
            category: product.category || "Umum",
            image: product.image,
          },
        ];
      }
      persistCart(updated);
      return updated;
    });
  }, []);

  const increaseQuantity = useCallback((id) => {
    setItems((prevItems) => {
      const updated = prevItems.map((item) => {
        if (item.id === id) {
          const maxStock = item.stock ?? 999;
          if (item.qty < maxStock) {
            return { ...item, qty: item.qty + 1 };
          }
        }
        return item;
      });
      persistCart(updated);
      return updated;
    });
  }, []);

  const decreaseQuantity = useCallback((id) => {
    setItems((prevItems) => {
      let updated;
      const target = prevItems.find((item) => item.id === id);
      if (!target) return prevItems;

      if (target.qty <= 1) {
        // Hapus item dari checkout jika kuantitas tinggal 1
        updated = prevItems.filter((item) => item.id !== id);
      } else {
        updated = prevItems.map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        );
      }
      persistCart(updated);
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((id, newQty) => {
    setItems((prevItems) => {
      let updated;
      if (newQty <= 0) {
        updated = prevItems.filter((item) => item.id !== id);
      } else {
        updated = prevItems.map((item) => {
          if (item.id === id) {
            const maxStock = item.stock ?? 999;
            return { ...item, qty: Math.min(newQty, maxStock) };
          }
          return item;
        });
      }
      persistCart(updated);
      return updated;
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prevItems) => {
      const updated = prevItems.filter((item) => item.id !== id);
      persistCart(updated);
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    const empty = [];
    persistCart(empty);
    setItems(empty);
  }, []);

  const resetToDefault = useCallback(() => {
    persistCart(INITIAL_CART_ITEMS);
    setItems(INITIAL_CART_ITEMS);
  }, []);

  const cartItemCount = items.reduce((sum, item) => sum + (item.qty || 0), 0);
  const cartUniqueCount = items.length;
  const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);

  return {
    items,
    cartItemCount,
    cartUniqueCount,
    subtotal,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    removeItem,
    clearCart,
    resetToDefault,
  };
}

export default useCart;
