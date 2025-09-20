const statusStyles = {
  Draft: "bg-amber-100 text-amber-800 ring-1 ring-amber-200",
  Published: "bg-sky-100 text-sky-800 ring-1 ring-sky-200",
  Completed: "bg-zinc-100 text-zinc-800 ring-1 ring-zinc-200",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        statusStyles[status] ||
          "bg-zinc-100 text-zinc-800 ring-1 ring-zinc-200",
      ].join(" ")}
    >
      {status}
    </span>
  );
}
