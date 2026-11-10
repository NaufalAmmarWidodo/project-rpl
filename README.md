# Fotocopy Cemerlang Indah

Platform digital untuk **Fotocopy Cemerlang Indah** — solusi terpadu untuk kebutuhan alat tulis kantor (ATK), percetakan digital, dan layanan perbaikan/service mesin fotocopy.

---

## 📁 Struktur Monorepo

```
project-rpl/
├── apps/
│   ├── api/                      # Backend REST API (Express + Prisma)
│   │   ├── prisma/               # Schema & Migrasi Database
│   │   ├── src/
│   │   │   ├── config/           # Konfigurasi database & library
│   │   │   ├── controllers/      # Handler logika endpoint
│   │   │   ├── middlewares/      # Auth, validasi, error handling
│   │   │   ├── models/           # Data models tambahan
│   │   │   ├── routes/           # Definisi routing API
│   │   │   ├── services/         # Business logic layer
│   │   │   ├── validators/       # Skema validasi request (Zod)
│   │   │   ├── app.js            # Inisialisasi Express
│   │   │   └── server.js         # Entry point server
│   │   ├── .env.example          # Contoh variabel lingkungan
│   │   └── package.json
│   │
│   └── web/                      # Frontend Web App (React + Vite)
│       ├── public/               # Asset statis publik
│       ├── src/
│       │   ├── assets/           # Media & gambar
│       │   ├── components/
│       │   │   ├── common/       # Komponen umum reusable
│       │   │   ├── layout/       # Komponen tata letak (Navbar, Footer, dsb)
│       │   │   └── ui/           # Komponen UI primitive (shadcn/base-ui)
│       │   ├── hooks/            # Custom React hooks
│       │   ├── layouts/          # Template layout halaman
│       │   ├── lib/              # Utility functions (cn helper, dsb)
│       │   ├── pages/            # Halaman aplikasi (customer, auth, admin)
│       │   ├── routes/           # Konfigurasi routing
│       │   ├── services/         # API client & fetchers
│       │   ├── App.jsx           # Root router komponen
│       │   ├── index.css         # Styling global Tailwind v4 & Shadcn
│       │   └── main.jsx          # Entry point React
│       ├── jsconfig.json         # Path alias (@/*)
│       ├── vite.config.js        # Konfigurasi Vite & Tailwind plugin
│       └── package.json
│
├── docs/                         # Dokumentasi teknis & arsitektur
├── .gitignore                    # Konfigurasi git ignore global
└── package.json                  # Root monorepo workspace & script agregator
```

---

## 🛠️ Teknologi yang Digunakan

### Frontend (`apps/web`)
- **React 19**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Shadcn UI** (dengan `@base-ui/react`)
- **React Router DOM v7**
- **Lucide React** (Icons)

### Backend (`apps/api`)
- **Node.js** (v20+)
- **Express 5**
- **Prisma ORM 7** (dengan `@prisma/adapter-mariadb`)
- **MariaDB / MySQL**
- **JSON Web Token (JWT)** & **bcrypt**
- **Zod** (Validasi skema request)
- **Helmet**, **CORS**, **Cookie Parser**

---

## 🚀 Panduan Memulai

### 1. Prasyarat
- Node.js versi 20 atau lebih baru
- Database MariaDB atau MySQL

### 2. Instalasi Dependensi
Jalankan instalasi dari root project:
```bash
npm install
```

### 3. Konfigurasi Backend (`apps/api`)
1. Masuk ke direktori `apps/api` atau salin template environment:
   ```bash
   cp apps/api/.env.example apps/api/.env
   ```
2. Sesuaikan konfigurasi database dan `JWT_SECRET` pada file `apps/api/.env`.
3. Jalankan migrasi Prisma dan generate client:
   ```bash
   npx prisma migrate dev --schema=apps/api/prisma/schema.prisma
   ```

### 4. Menjalankan Server Development

Dari root directory:

- **Jalankan API (Backend)**:
  ```bash
  npm run dev:api
  ```
  API berjalan di `http://localhost:5000`

- **Jalankan Web (Frontend)**:
  ```bash
  npm run dev:web
  ```
  Web client berjalan di `http://localhost:5173`

- **Build Frontend**:
  ```bash
  npm run build:web
  ```

---

## 📋 Endpoint API Utama

| Method | Endpoint | Deskripsi | Akses |
|---|---|---|---|
| `GET` | `/` | Health check API | Publik |
| `POST` | `/api/auth/register` | Mendaftarkan akun customer baru | Publik |
| `POST` | `/api/auth/login` | Login user (set cookie token) | Publik |
| `POST` | `/api/auth/logout` | Logout (hapus cookie token) | Publik |
| `GET` | `/api/auth/me` | Profil pengguna saat ini | Authenticated |
