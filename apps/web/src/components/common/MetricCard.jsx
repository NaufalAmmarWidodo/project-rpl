import React from "react";
import { cn } from "@/lib/utils";

export default function MetricCard({
  icon: Icon,
  label,
  value,
  change,
  isPositive = true,
  className,
}) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between transition-all hover:shadow-[0_12px_36px_rgb(0,0,0,0.06)] hover:-translate-y-0.5",
        className
      )}
    >
      <div className="flex items-center gap-2.5 text-gray-500 mb-2">
        {Icon && (
          <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200/60 flex items-center justify-center text-gray-700">
            <Icon size={16} />
          </div>
        )}
        <span className="text-xs font-semibold text-gray-600">{label}</span>
      </div>

      <div className="flex items-baseline justify-between mt-1">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
        {change && (
          <span
            className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full",
              isPositive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-rose-50 text-rose-600"
            )}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
