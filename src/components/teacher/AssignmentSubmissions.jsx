export default function AssignmentSubmissions({
  items,
  loading,
  error,
  onReload,
  onToggleReviewed,
}) {
  if (loading) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
        Loading submissions…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        {error}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
        No submissions yet.
        <button
          onClick={onReload}
          className="ml-3 inline-flex items-center justify-center rounded-none border border-zinc-300 bg-white px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-none border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="text-zinc-700">
              <th className="px-3 py-2 font-semibold">Student</th>
              <th className="px-3 py-2 font-semibold">Answer</th>
              <th className="px-3 py-2 font-semibold">Submitted</th>
              <th className="px-3 py-2 font-semibold">Reviewed</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {items.map((s) => (
              <tr key={s._id}>
                <td className="px-3 py-2 text-zinc-900">{s.studentName}</td>
                <td className="px-3 py-2 text-zinc-700">{s.answer}</td>
                <td className="px-3 py-2 text-zinc-600">
                  {new Date(s.submittedAt).toLocaleString()}
                </td>
                <td className="px-3 py-2">
                  <span
                    className={[
                      "inline-flex items-center rounded-none px-2 py-0.5 text-xs font-medium",
                      s.reviewed
                        ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200"
                        : "bg-zinc-100 text-zinc-800 ring-1 ring-zinc-200",
                    ].join(" ")}
                  >
                    {s.reviewed ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => onToggleReviewed(s._id, !s.reviewed)}
                    className="inline-flex items-center justify-center rounded-none bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                  >
                    {s.reviewed ? "Unmark" : "Mark Reviewed"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3">
        <button
          onClick={onReload}
          className="inline-flex items-center justify-center rounded-none border border-zinc-300 bg-white px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
