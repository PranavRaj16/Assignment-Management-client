export function ErrorAlert({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="mb-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
    >
      <span className="font-medium">Error:</span>
      <span className="flex-1">{message}</span>
      <button
        onClick={onDismiss}
        className="text-red-700/80 hover:text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 rounded"
        aria-label="Dismiss error"
      >
        ✕
      </button>
    </div>
  );
}

export function SuccessAlert({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div
      role="status"
      aria-atomic="true"
      className="mb-4 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
    >
      <span className="font-medium">Success:</span>
      <span className="flex-1">{message}</span>
      <button
        onClick={onDismiss}
        className="text-emerald-700/80 hover:text-emerald-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 rounded"
      >
        ✕
      </button>
    </div>
  );
}
