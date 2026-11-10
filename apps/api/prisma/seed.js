import bcrypt from "bcrypt";
import prisma from "../src/config/prisma.js";

async function main() {
  console.log("Memulai proses seeding database Fotocopy Cemerlang Indah...");

  // 1. BUAT USERS DENGAN PASSWORD SESUAI PERSYARATAN
  const adminHash = await bcrypt.hash("admin123", 10);
  const supplierHash = await bcrypt.hash("supplier123", 10);
  const customerHash = await bcrypt.hash("customer123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@cemerlang.com" },
    update: { passwordHash: adminHash },
    create: {
      email: "admin@cemerlang.com",
      passwordHash: adminHash,
      fullName: "Jane Cooper (Admin Operasional)",
      phone: "081234567890",
      role: "ADMIN",
    },
  });

  const supplier = await prisma.user.upsert({
    where: { email: "supplier@mitra.com" },
    update: { passwordHash: supplierHash },
    create: {
      email: "supplier@mitra.com",
      passwordHash: supplierHash,
      fullName: "PT Sinar Grafika Mitra Logistik",
      phone: "082198765432",
      role: "SUPPLIER",
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: "customer@gmail.com" },
    update: { passwordHash: customerHash },
    create: {
      email: "customer@gmail.com",
      passwordHash: customerHash,
      fullName: "Budi Santoso",
      phone: "085612345678",
      role: "CUSTOMER",
    },
  });

  console.log("✅ Pengguna default siap digunakan:");
  console.log("   - Admin:    admin@cemerlang.com / admin123");
  console.log("   - Supplier: supplier@mitra.com / supplier123");
  console.log("   - Customer: customer@gmail.com / customer123");

  // 2. KATEGORI PRODUK
  const categoriesData = [
    { name: "Kertas", description: "Kertas HVS A4, F4, A3, Karton, dan Plano" },
    { name: "Alat Tulis", description: "Pulpen, Pensil, Penghapus, Spidol" },
    { name: "Buku", description: "Buku Tulis, Buku Kas, Blocknote, Agenda" },
    { name: "Perlengkapan Kantor", description: "Ordner, Map Kancing, Stapler, Klip" },
    { name: "Suku Cadang Mesin", description: "Toner, Drum Unit, Roll Fuser Fotocopy" },
  ];

  const categories = {};
  for (const cat of categoriesData) {
    const createdCat = await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
    categories[cat.name] = createdCat.id;
  }

  // 3. PRODUK ATK & SPAREPART
  const productsData = [
    {
      sku: "ATK-HVS-A4",
      name: "Kertas HVS A4 70 GSM PaperOne",
      categoryId: categories["Kertas"],
      supplierId: supplier.id,
      unit: "Rim",
      price: 55000,
      stock: 45,
      minStock: 15,
    },
    {
      sku: "ATK-HVS-F4",
      name: "Kertas HVS F4 70 GSM Sinar Dunia",
      categoryId: categories["Kertas"],
      supplierId: supplier.id,
      unit: "Rim",
      price: 60000,
      stock: 5, // Alert stok rendah
      minStock: 15,
    },
    {
      sku: "ATK-PEN-AE7",
      name: "Pulpen Standard AE7 Hitam (Box 12 Pcs)",
      categoryId: categories["Alat Tulis"],
      supplierId: supplier.id,
      unit: "Box",
      price: 42000,
      stock: 60,
      minStock: 10,
    },
    {
      sku: "ATK-BKU-KIKY",
      name: "Buku Tulis Kiky 38 Lembar (Pack 10 Pcs)",
      categoryId: categories["Buku"],
      supplierId: supplier.id,
      unit: "Pack",
      price: 38000,
      stock: 75,
      minStock: 20,
    },
    {
      sku: "ATK-MAP-KANCING",
      name: "Map Plastik Kancing Folio (Lusin)",
      categoryId: categories["Perlengkapan Kantor"],
      supplierId: supplier.id,
      unit: "Lusin",
      price: 36000,
      stock: 40,
      minStock: 10,
    },
    {
      sku: "SP-TONER-NPG51",
      name: "Toner Mesin Fotocopy NPG-51 Original",
      categoryId: categories["Suku Cadang Mesin"],
      supplierId: supplier.id,
      unit: "Tabung",
      price: 450000,
      stock: 12,
      minStock: 5,
    },
    {
      sku: "SP-DRUM-IR3235",
      name: "Drum Unit Fotocopy Canon IR 3235 / 3245",
      categoryId: categories["Suku Cadang Mesin"],
      supplierId: supplier.id,
      unit: "Unit",
      price: 850000,
      stock: 4, // Alert stok rendah
      minStock: 6,
    },
    {
      sku: "SP-ROLL-FUSER",
      name: "Roll Fuser Bawah Canon IR 3300 / 4570",
      categoryId: categories["Suku Cadang Mesin"],
      supplierId: supplier.id,
      unit: "Pcs",
      price: 175000,
      stock: 8,
      minStock: 4,
    },
  ];

  for (const prod of productsData) {
    await prisma.product.upsert({
      where: { sku: prod.sku },
      update: { stock: prod.stock, price: prod.price },
      create: prod,
    });
  }

  // 4. LAYANAN PERCETAKAN
  const printServicesData = [
    {
      name: "Print Dokumen HVS",
      description: "Cetak dokumen makalah, laporan, skripsi",
      basePrice: 500,
    },
    {
      name: "Jilid Spiral & Hardcover",
      description: "Jilid lakban, kawat spiral, dan hardcover skripsi emas",
      basePrice: 15000,
    },
    {
      name: "Banner & Spanduk Vinyl",
      description: "Cetak spanduk outdoor flexi 280-340 gsm beresolusi tajam",
      basePrice: 25000,
    },
    {
      name: "Cetak Foto Glossy",
      description: "Kertas foto tebal 230gsm tahan air dan pudar",
      basePrice: 5000,
    },
  ];

  for (const s of printServicesData) {
    const existing = await prisma.printService.findFirst({
      where: { name: s.name },
    });
    if (!existing) {
      await prisma.printService.create({ data: s });
    }
  }

  // 5. TIPE LAYANAN SERVICE MESIN FOTOCOPY
  const serviceTypesData = [
    {
      name: "Perbaikan Mesin Error E-001 / Fuser",
      description: "Pemeriksaan unit pemanas, thermistor, dan penggantian roll",
      basePrice: 150000,
    },
    {
      name: "Perawatan Rutin & Pembersihan Optik/Cermin",
      description: "Pembersihan cermin laser, sensor kertas, dan pelumasan mekanik",
      basePrice: 120000,
    },
    {
      name: "Ganti Drum Unit & Cleaning Blade",
      description: "Mengatasi hasil cetak bergaris hitam atau buram berulang",
      basePrice: 100000,
    },
    {
      name: "Penanganan Paper Jam Kronis",
      description: "Perbaikan karet penarik kertas (pickup roller) yang aus",
      basePrice: 95000,
    },
  ];

  for (const st of serviceTypesData) {
    const existing = await prisma.serviceType.findFirst({
      where: { name: st.name },
    });
    if (!existing) {
      await prisma.serviceType.create({ data: st });
    }
  }

  // 6. SAMPLE SERVICE TICKET (Customer -> Admin)
  const firstServiceType = await prisma.serviceType.findFirst();
  if (firstServiceType) {
    const existingTicket = await prisma.serviceRequest.findFirst({
      where: { userId: customer.id },
    });
    if (!existingTicket) {
      await prisma.serviceRequest.create({
        data: {
          userId: customer.id,
          serviceTypeId: firstServiceType.id,
          machineBrand: "Canon ImageRunner",
          machineModel: "IR-3245",
          machineSerial: "CAN-98214-JKT",
          problemDescription: "Layar monitor mesin menampilkan Error E-000001 dan kertas macet di unit 1 fuser.",
          serviceAddress: "Jl. Cemerlang Raya No. 44, Perkantoran Blok C, Jakarta",
          status: "IN_PROGRESS",
          notes: "Teknisi Rian Pratama ditugaskan. Menuju lokasi pelanggan.",
          estimatedCost: 185000,
        },
      });
    }
  }

  console.log("✅ Seeding basis data selesai dengan sukses!");
}

main()
  .catch((e) => {
    console.error("Kesalahan saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
