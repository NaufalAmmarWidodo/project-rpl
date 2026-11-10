import readline from "readline";
import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

async function createUser(email, password, role, fullName, phone) {
  try {
    const validRoles = ["ADMIN", "SUPPLIER", "CUSTOMER"];
    const formattedRole = role.toUpperCase();

    if (!validRoles.includes(formattedRole)) {
      console.error(`❌ Error: Role tidak valid! Pilih salah satu: ${validRoles.join(", ")}`);
      process.exit(1);
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    const passwordHash = await bcrypt.hash(password, 10);

    if (existing) {
      const updated = await prisma.user.update({
        where: { email },
        data: {
          passwordHash,
          role: formattedRole,
          fullName: fullName || existing.fullName,
          phone: phone || existing.phone,
        },
      });
      console.log(`\n✅ Akun ${email} berhasil DIPERBARUI menjadi Role [${updated.role}]!`);
      console.log(`   - Nama: ${updated.fullName}`);
      console.log(`   - Role: ${updated.role}`);
      console.log(`   - Password baru aktif.`);
    } else {
      const created = await prisma.user.create({
        data: {
          email,
          passwordHash,
          role: formattedRole,
          fullName: fullName || (formattedRole === "ADMIN" ? "Admin Toko" : formattedRole === "SUPPLIER" ? "Mitra Supplier" : "Customer"),
          phone: phone || "081234567890",
        },
      });
      console.log(`\n✅ Akun baru berhasil DIBUAT dengan Role [${created.role}]!`);
      console.log(`   - Email:    ${created.email}`);
      console.log(`   - Nama:     ${created.fullName}`);
      console.log(`   - Role:     ${created.role}`);
      console.log(`   - Password: ${password}`);
    }
  } catch (err) {
    console.error("❌ Gagal membuat user:", err.message);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

// 1. Ambil dari argument CLI jika ada: node create-user.js <email> <password> <role> [name] [phone]
const args = process.argv.slice(2);
if (args.length >= 3) {
  const [email, password, role, fullName, phone] = args;
  createUser(email, password, role, fullName, phone);
} else {
  // 2. Mode Interaktif Tanya Jawab di Terminal
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("\n=======================================================");
  console.log(" 🛠️  PEMBUAT AKUN ADMIN / SUPPLIER (FOTOCOPY CEMERLANG) ");
  console.log("=======================================================\n");

  rl.question("1. Masukkan Email: ", (email) => {
    rl.question("2. Masukkan Password: ", (password) => {
      rl.question("3. Pilih Role (ADMIN / SUPPLIER / CUSTOMER): ", (role) => {
        rl.question("4. Masukkan Nama Lengkap (Opsional): ", (fullName) => {
          rl.question("5. Masukkan No. HP/WhatsApp (Opsional): ", (phone) => {
            rl.close();
            createUser(email.trim(), password.trim(), role.trim(), fullName.trim(), phone.trim());
          });
        });
      });
    });
  });
}
