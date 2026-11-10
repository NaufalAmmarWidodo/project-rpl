import "dotenv/config";
import app from "./app.js";
import prisma from "./config/prisma.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database berhasil terhubung!");

    const server = app.listen(PORT, () => {
      console.log(`Server API berjalan di http://localhost:${PORT}`);
    });

    const shutdown = async (signal) => {
      console.log(`\nMenerima sinyal ${signal}, menutup server secara aman...`);
      server.close(async () => {
        try {
          await prisma.$disconnect();
          console.log("Koneksi database ditutup.");
          process.exit(0);
        } catch (err) {
          console.error("Kesalahan saat menutup koneksi database:", err);
          process.exit(1);
        }
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("Gagal menjalankan server:", error);
    process.exit(1);
  }
}

startServer();
