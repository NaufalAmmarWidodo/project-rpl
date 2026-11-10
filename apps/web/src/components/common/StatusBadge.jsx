import React from "react";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  // Indonesian keys
  Pending: {
    label: "Pending",
    bg: "bg-amber-50 text-amber-700 border-amber-200/60",
    dot: "bg-amber-500",
  },
  Diproses: {
    label: "Diproses",
    bg: "bg-sky-50 text-sky-700 border-sky-200/60",
    dot: "bg-sky-500",
  },
  Selesai: {
    label: "Selesai",
    bg: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    dot: "bg-emerald-500",
  },
  Ditolak: {
    label: "Ditolak",
    bg: "bg-rose-50 text-rose-700 border-rose-200/60",
    dot: "bg-rose-500",
  },
  "Stok Rendah": {
    label: "Stok Rendah",
    bg: "bg-orange-50 text-orange-700 border-orange-200/60",
    dot: "bg-orange-500 animate-pulse",
  },

  // Prisma Enum Fallbacks
  PENDING: {
    label: "Pending",
    bg: "bg-amber-50 text-amber-700 border-amber-200/60",
    dot: "bg-amber-500",
  },
  PROCESSING: {
    label: "Diproses",
    bg: "bg-sky-50 text-sky-700 border-sky-200/60",
    dot: "bg-sky-500",
  },
  COMPLETED: {
    label: "Selesai",
    bg: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    dot: "bg-emerald-500",
  },
  CANCELLED: {
    label: "Ditolak",
    bg: "bg-rose-50 text-rose-700 border-rose-200/60",
    dot: "bg-rose-500",
  },
  LOW_STOCK: {
    label: "Stok Rendah",
    bg: "bg-orange-50 text-orange-700 border-orange-200/60",
    dot: "bg-orange-500 animate-pulse",
  },
};

export default function StatusBadge({ status, className }) {
  const config = STATUS_CONFIG[status] || {
    label: status,
    bg: "bg-gray-100 text-gray-700 border-gray-200",
    dot: "bg-gray-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-2xs transition-all",
        config.bg,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}
