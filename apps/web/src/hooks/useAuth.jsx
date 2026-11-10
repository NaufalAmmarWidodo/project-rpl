import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "@/services/auth.service";

export const MOCK_ACCOUNTS = {
  admin: {
    id: "usr_admin_01",
    nama: "Ahmad Dani",
    fullName: "Ahmad Dani",
    email: "admin@cemerlang.com",
    role: "ADMIN",
    jabatan: "Lead Admin Operasional",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  },
  supplier: {
    id: "usr_supp_01",
    nama: "PT Sinar Grafika",
    fullName: "PT Sinar Grafika Mitra Logistik",
    email: "supplier@mitra.com",
    role: "SUPPLIER",
    jabatan: "Mitra Pasokan & Distribusi ATK",
    avatarUrl: "",
  },
  customer: {
    id: "usr_cust_01",
    nama: "Budi Santoso",
    fullName: "Budi Santoso",
    email: "customer@gmail.com",
    role: "CUSTOMER",
    jabatan: "Pelanggan Prioritas",
    avatarUrl: "",
  },
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Initialize immediately from localStorage so session persists on refresh
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user_profile");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to parse cached user profile:", e);
    }
    // Default to admin profile for seamless testing if no profile saved yet
    return null;
  });

  const [loading, setLoading] = useState(false);

  // Sync profile with backend if available; keep cache if offline
  useEffect(() => {
    let isMounted = true;

    async function checkServerSession() {
      try {
        const res = await authService.getMe();
        if (isMounted && res && res.success && res.data) {
          const normalizedUser = {
            ...res.data,
            nama: res.data.fullName || res.data.name || res.data.nama || "Pengguna",
            jabatan:
              res.data.jabatan ||
              (res.data.role === "ADMIN"
                ? "Admin Operasional"
                : res.data.role === "SUPPLIER"
                ? "Mitra Supplier Resmi"
                : "Pelanggan Terdaftar"),
          };
          setUser(normalizedUser);
          localStorage.setItem("user_profile", JSON.stringify(normalizedUser));
        }
      } catch (err) {
        // If server is offline, keep the existing cached user profile in localStorage
        console.info("Backend API offline or unauthenticated; using local state session.");
      }
    }

    checkServerSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (credentials) => {
    const { email = "", password = "" } = credentials || {};

    try {
      const res = await authService.login(credentials);
      if (res && res.success && res.data) {
        const normalized = {
          ...res.data,
          nama: res.data.fullName || res.data.name || res.data.nama || "Pengguna",
          jabatan:
            res.data.jabatan ||
            (res.data.role === "ADMIN"
              ? "Admin Operasional"
              : res.data.role === "SUPPLIER"
              ? "Mitra Supplier Resmi"
              : "Pelanggan Terdaftar"),
        };
        setUser(normalized);
        localStorage.setItem("user_profile", JSON.stringify(normalized));
        if (res.token) {
          localStorage.setItem("token", res.token);
        }
        return normalized;
      }
    } catch (err) {
      console.warn("Live API login unavailable; checking offline mock credentials...", err?.message);
    }

    // Smart Offline Fallback Mode
    const cleanEmail = email.toLowerCase().trim();
    let fallbackProfile = null;

    if (cleanEmail === "admin@cemerlang.com" || cleanEmail.includes("admin")) {
      fallbackProfile = { ...MOCK_ACCOUNTS.admin };
    } else if (cleanEmail === "supplier@mitra.com" || cleanEmail.includes("supplier")) {
      fallbackProfile = { ...MOCK_ACCOUNTS.supplier };
    } else if (cleanEmail === "customer@gmail.com" || cleanEmail.includes("customer")) {
      fallbackProfile = { ...MOCK_ACCOUNTS.customer };
    } else if (cleanEmail) {
      // Dynamic fallback for any entered email
      const namePart = cleanEmail.split("@")[0].replace(/[._-]/g, " ");
      const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      fallbackProfile = {
        id: "usr_mock_" + Date.now(),
        nama: formattedName,
        fullName: formattedName,
        email: cleanEmail,
        role: cleanEmail.includes("admin") ? "ADMIN" : cleanEmail.includes("supp") ? "SUPPLIER" : "CUSTOMER",
        jabatan: "Pengguna Terverifikasi",
        avatarUrl: "",
      };
    }

    if (fallbackProfile) {
      setUser(fallbackProfile);
      localStorage.setItem("user_profile", JSON.stringify(fallbackProfile));
      localStorage.setItem("token", "mock_session_token_" + fallbackProfile.role);
      return fallbackProfile;
    }

    throw new Error("Kredensial tidak valid. Silakan gunakan tombol Cepat Masuk.");
  };

  const switchAccount = (roleKey) => {
    const target = MOCK_ACCOUNTS[roleKey];
    if (target) {
      setUser(target);
      localStorage.setItem("user_profile", JSON.stringify(target));
      localStorage.setItem("token", "mock_session_token_" + target.role);
      return target;
    }
  };

  const register = async (data) => {
    try {
      const res = await authService.register(data);
      if (res && res.success && res.data) {
        setUser(res.data);
        localStorage.setItem("user_profile", JSON.stringify(res.data));
        return res.data;
      }
    } catch (err) {
      console.warn("Live register failed, creating local session...");
    }

    const fallbackUser = {
      id: "usr_reg_" + Date.now(),
      nama: data.fullName || "Pengguna Baru",
      fullName: data.fullName || "Pengguna Baru",
      email: data.email,
      role: data.role || "CUSTOMER",
      jabatan: data.role === "ADMIN" ? "Admin Operasional" : data.role === "SUPPLIER" ? "Mitra Supplier" : "Pelanggan",
      avatarUrl: "",
    };
    setUser(fallbackUser);
    localStorage.setItem("user_profile", JSON.stringify(fallbackUser));
    return fallbackUser;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      // ignore
    } finally {
      setUser(null);
      localStorage.removeItem("user_profile");
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role,
        loading,
        login,
        switchAccount,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
