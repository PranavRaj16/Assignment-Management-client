import React from "react";
import StatusBadge from "./StatusBadge";

function AssignmentCard({
  assignment,
  onEdit,
  onDelete,
  onPublish,
  onComplete,
  onViewSubmissions,
}) {
  return (
    <div className="rounded-none border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-zinc-900">
            {assignment.title}
          </h3>
          <p className="mt-2 text-zinc-600">{assignment.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
            <span>
              Due: {new Date(assignment.dueDate).toLocaleDateString()}
            </span>
            <span>
              Created: {new Date(assignment.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3">
          <StatusBadge status={assignment.status} />

          {assignment.status === "Draft" && (
            <>
              <button
                onClick={() => onEdit(assignment)}
                className="inline-flex items-center justify-center rounded-none bg-amber-500 px-3 py-1 text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(assignment._id)}
                className="inline-flex items-center justify-center rounded-none bg-rose-600 px-3 py-1 text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
              >
                Delete
              </button>
              <button
                onClick={() => onPublish(assignment._id)}
                className="inline-flex items-center justify-center rounded-none bg-sky-600 px-3 py-1 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                Publish
              </button>
            </>
          )}

          {assignment.status === "Published" && (
            <>
              <button
                onClick={() => onViewSubmissions(assignment._id)}
                className="inline-flex items-center justify-center rounded-none bg-sky-600 px-3 py-1 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                View Submissions
              </button>
              <button
                onClick={() => onComplete(assignment._id)}
                className="inline-flex items-center justify-center rounded-none bg-zinc-700 px-3 py-1 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
              >
                Complete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(AssignmentCard);
