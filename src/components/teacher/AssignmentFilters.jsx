const FILTERS = ["all", "Draft", "Published", "Completed"];

export default function AssignmentFilters({ items, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((status) => {
        const active = value === status;
        const count =
          status === "all"
            ? items.length
            : items.filter((a) => a.status === status).length;
        return (
          <button
            key={status}
            onClick={() => onChange(status)}
            aria-pressed={active}
            className={[
              "inline-flex items-center gap-2 rounded-none px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 transition",
              active
                ? "bg-indigo-600 text-white shadow-sm focus-visible:ring-indigo-300"
                : "bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-50 focus-visible:ring-zinc-300",
            ].join(" ")}
          >
            {status === "all" ? "All" : status}
            {status !== "all" && (
              <span className="inline-flex items-center rounded-none bg-zinc-100 text-zinc-700 px-2 py-0.5 text-xs">
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
