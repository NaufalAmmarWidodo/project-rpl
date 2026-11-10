export function notFoundHandler(req, res, _next) {
  res.status(404).json({
    success: false,
    message: `Rute '${req.method} ${req.originalUrl}' tidak ditemukan`,
  });
}

export function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Terjadi kesalahan internal pada server";

  if (process.env.NODE_ENV !== "test") {
    console.error(`[ERROR] ${statusCode} - ${message}`, err.stack || err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
