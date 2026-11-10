# Arsitektur Proyek Fotocopy Cemerlang Indah

## Ringkasan Desain Sistem

Sistem ini dirancang menggunakan pendekatan arsitektur monorepo modular yang memisahkan client-side (`apps/web`) dan server-side (`apps/api`).

### 1. Data Model (Prisma)
- **User & Roles**: Mendukung peran `CUSTOMER`, `ADMIN`, dan `SUPPLIER`.
- **Katalog Produk & Kategori**: Menyimpan produk ATK, stok, minimum stok, harga, dan relasi supplier.
- **Transaksi Penjualan**: Keranjang belanja (`Cart`, `CartItem`), Pesanan (`Order`, `OrderItem`), dan Pembayaran (`Payment`).
- **Layanan Percetakan**: Permintaan cetak (`PrintRequest`) dengan jenis layanan (`PrintService`).
- **Layanan Service Fotocopy**: Permintaan perbaikan mesin fotocopy (`ServiceRequest`) dengan tipe layanan (`ServiceType`).
- **Pencatatan Stok**: Mutasi keluar/masuk barang (`StockMovement`).

### 2. Standar Struktur Kode
- **Komponen UI**: Semua komponen React menggunakan konvensi PascalCase (misal `Navbar.jsx`, `Button.jsx`).
- **Path Alias**: Import internal web menggunakan alias `@/*` yang merujuk pada `apps/web/src/*`.
- **Respons API**: Selalu mengikuti format standar JSON:
  - Sukses: `{ "success": true, "data": ..., "message": "..." }`
  - Gagal: `{ "success": false, "message": "...", "errors": [...] }`
- **Autentikasi**: Menggunakan HttpOnly cookie untuk menyimpan JWT token demi perlindungan terhadap risiko serangan XSS.
