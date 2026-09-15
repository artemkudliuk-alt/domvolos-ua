"use client";

type CatalogPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export function CatalogPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange
}: CatalogPaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row">
      <span className="text-sm font-light text-slate-500">
        Показано <strong className="font-medium text-slate-700">{startItem}–{endItem}</strong> з <strong className="font-medium text-slate-700">{totalItems}</strong> товарів
      </span>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex h-8 items-center justify-center rounded-full border border-slate-200 bg-white px-3 text-sm font-light text-slate-600 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Назад
        </button>

        {getPageNumbers().map((page, idx) => (
          typeof page === "number" ? (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={[
                "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-light transition-all duration-200",
                currentPage === page
                  ? "bg-ink font-normal text-white shadow-2xs"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-ink"
              ].join(" ")}
            >
              {page}
            </button>
          ) : (
            <span key={`dots-${idx}`} className="px-1 text-sm text-slate-400">
              ...
            </span>
          )
        ))}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex h-8 items-center justify-center rounded-full border border-slate-200 bg-white px-3 text-sm font-light text-slate-600 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          Далі →
        </button>
      </div>
    </div>
  );
}
