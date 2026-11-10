import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 24 * 60 * 60 * 1000,
  path: "/",
};

function createToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET belum diatur di file .env");
  }

  return jwt.sign(
    {
      sub: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

function userResponse(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
}

// REGISTRASI CUSTOMER
export async function register(req, res) {
  const { fullName, email, password, phone } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "Email sudah terdaftar",
    });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      passwordHash,
      phone,
      role: "CUSTOMER",
    },
  });

  return res.status(201).json({
    success: true,
    message: "Registrasi berhasil",
    data: userResponse(user),
  });
}

// LOGIN SEMUA ROLE
export async function login(req, res) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({
      success: false,
      message: "Email atau password salah",
    });
  }

  if (!user.isActive) {
    return res.status(403).json({
      success: false,
      message: "Akun sedang dinonaktifkan",
    });
  }

  const token = createToken(user);

  res.cookie("token", token, cookieOptions);

  return res.json({
    success: true,
    message: "Login berhasil",
    data: userResponse(user),
  });
}

// LOGOUT
export function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.json({
    success: true,
    message: "Logout berhasil",
  });
}

// DATA PENGGUNA YANG SEDANG LOGIN
export async function me(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  });

  if (!user || !user.isActive) {
    return res.status(401).json({
      success: false,
      message: "Akun tidak ditemukan atau tidak aktif",
    });
  }

  return res.json({
    success: true,
    data: userResponse(user),
  });
}

// BUAT USER BARU DENGAN ROLE TERTENTU (ADMIN ONLY)
export async function createUserByAdmin(req, res, next) {
  try {
    const { email, password, role = "ADMIN", fullName, phone } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password, dan role wajib diisi",
      });
    }

    const formattedRole = role.toUpperCase();
    if (!["ADMIN", "SUPPLIER", "CUSTOMER"].includes(formattedRole)) {
      return res.status(400).json({
        success: false,
        message: "Role tidak valid! Gunakan: ADMIN, SUPPLIER, atau CUSTOMER",
      });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `Email ${email} sudah terdaftar`,
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: formattedRole,
        fullName: fullName || (formattedRole === "ADMIN" ? "Admin Operasional" : formattedRole === "SUPPLIER" ? "Mitra Supplier" : "Customer"),
        phone: phone || null,
      },
    });

    return res.status(201).json({
      success: true,
      message: `Akun baru dengan role [${user.role}] berhasil dibuat`,
      data: userResponse(user),
    });
  } catch (err) {
    next(err);
  }
}