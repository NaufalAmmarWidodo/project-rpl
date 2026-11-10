import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DataTable({
  columns = [],
  data = [],
  searchKey = "name",
  searchPlaceholder = "Cari data...",
  title,
  actionButton,
  pageSize = 5,
  className,
}) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    return data.filter((item) => {
      const val = item[searchKey];
      if (typeof val === "string") {
        return val.toLowerCase().includes(search.toLowerCase());
      }
      return false;
    });
  }, [data, search, searchKey]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <div
      className={cn(
        "bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.03)] flex flex-col",
        className
      )}
    >
      {/* Table Header: Title, Search, and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        {title && (
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            {title}
          </h2>
        )}

        <div className="flex items-center gap-3 ml-auto w-full sm:w-auto">
          <div className="relative flex-1 sm:w-60">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full bg-gray-50/70 border border-gray-200/80 rounded-xl py-2 pl-9 pr-3 text-xs text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:border-slate-900 transition"
            />
          </div>

          {actionButton}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100 relative max-h-[460px]">
        <table className="w-full text-left text-xs border-collapse">
          {/* Sticky Header */}
          <thead className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur-xs text-gray-500 font-semibold border-b border-gray-200/70">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key || col.header}
                  className={cn("py-3.5 px-4 font-medium", col.className)}
                >
                  {col.header}
                </th>
              ))}
              <th className="py-3.5 px-4 text-right font-medium">Aksi</th>
            </tr>
          </thead>

          {/* Zebra Striped Rows */}
          <tbody className="divide-y divide-gray-100/80">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  className="even:bg-gray-50/40 hover:bg-slate-50 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key || col.header}
                      className={cn("py-3.5 px-4 text-gray-700", col.className)}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}

                  <td className="py-3.5 px-4 text-right">
                    {row.renderActions ? (
                      row.renderActions(row)
                    ) : (
                      <button
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                        aria-label="Menu Opsi"
                      >
                        <MoreVertical size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="py-12 text-center text-gray-400"
                >
                  Tidak ada data yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination */}
      <div className="flex items-center justify-between pt-4 mt-2 text-xs text-gray-500 border-t border-gray-100">
        <span>
          Menampilkan{" "}
          <strong className="text-gray-800">
            {filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          </strong>{" "}
          sampai{" "}
          <strong className="text-gray-800">
            {Math.min(currentPage * pageSize, filteredData.length)}
          </strong>{" "}
          dari <strong className="text-gray-800">{filteredData.length}</strong> entri
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition"
            aria-label="Previous Page"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="px-3 py-1 font-semibold text-gray-700">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition"
            aria-label="Next Page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
