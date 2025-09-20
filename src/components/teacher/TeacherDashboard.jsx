import { useMemo, useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAssignments } from "../../hooks/useAssignments";
import { useSubmissions } from "../../hooks/useSubmissions";
import AssignmentForm from "./AssignmentForm";
import AssignmentCard from "./AssignmentCard";
import AssignmentFilters from "./AssignmentFilters";
import AssignmentSubmissions from "./AssignmentSubmissions";
import { ErrorAlert, SuccessAlert } from "../common/Alert";
import ConfirmModal from "../common/ConfirmModal";
import { status, modalConfig } from "../../constants/status";

export default function TeacherDashboard() {
  const { user, logout } = useAuth();
  const {
    items,
    loading,
    error,
    success,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    updateStatus,
    clearMessages,
  } = useAssignments();

  const [modalType, setModalType] = useState(status.Deleted);
  const [filter, setFilter] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [target, setTarget] = useState(null);

  const [openSubmissionsId, setOpenSubmissionsId] = useState(null);
  const submissions = useSubmissions(
    openSubmissionsId,
    Boolean(openSubmissionsId)
  );

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((a) => a.status === filter);
  }, [items, filter]);

  const openConfirmModal = useCallback((id, type) => {
    setTarget(id);
    setShowModal(true);
    setModalType(type);
  }, []);

  const handleStatusChange = useCallback(
    async (id, status) => {
      await updateStatus(id, status);
      setTimeout(() => clearMessages(), 3000);
    },
    [updateStatus, clearMessages]
  );

  const confirmModal = useCallback(async () => {
    if (target) {
      if (modalType === status.Published) {
        await handleStatusChange(target, "Published");
      } else if (modalType === status.Completed) {
        await handleStatusChange(target, "Completed");
      } else if (modalType === status.Deleted) {
        await deleteAssignment(target);
      }
    }
    setShowModal(false);
    setTarget(null);
  }, [target, deleteAssignment, handleStatusChange, modalType]);

  const handleCreate = useCallback(
    async (payload) => {
      await createAssignment(payload);
      setShowCreateForm(false);
      setTimeout(() => clearMessages(), 3000);
    },
    [createAssignment, clearMessages]
  );

  const handleEditSave = useCallback(
    async (id, payload) => {
      await updateAssignment(id, payload);
      setEditingId(null);
      setTimeout(() => clearMessages(), 3000);
    },
    [updateAssignment, clearMessages]
  );

  const handleViewSubmissions = useCallback((assignmentId) => {
    setOpenSubmissionsId((prev) =>
      prev === assignmentId ? null : assignmentId
    );
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div
          className="relative h-12 w-12 rounded-full border-2 border-zinc-300 border-t-indigo-600 animate-spin"
          role="status"
          aria-live="polite"
        />
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <nav className="bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-zinc-900 tracking-tight">
                Teacher Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-zinc-700">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="inline-flex items-center justify-center rounded-none bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <ErrorAlert message={error} onDismiss={clearMessages} />
        <SuccessAlert message={success} onDismiss={clearMessages} />

        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <AssignmentFilters
            items={items}
            value={filter}
            onChange={setFilter}
          />
          <button
            onClick={() => {
              setShowCreateForm(true);
              setEditingId(null);
            }}
            className="inline-flex items-center justify-center rounded-none bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
          >
            Create Assignment
          </button>
        </div>

        {showCreateForm && (
          <div className="rounded-none border border-zinc-200 bg-white p-6 shadow-sm mb-6">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900">
              Create New Assignment
            </h3>
            <AssignmentForm
              onSubmit={handleCreate}
              onCancel={() => setShowCreateForm(false)}
              submitLabel="Create Assignment"
            />
          </div>
        )}

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-zinc-500">
                No assignments found for the selected filter.
              </p>
            </div>
          ) : (
            filtered.map((assignment) =>
              editingId === assignment._id ? (
                <div
                  key={assignment._id}
                  className="rounded-none border border-zinc-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="mb-4 text-lg font-semibold text-zinc-900">
                    Edit Assignment
                  </h3>
                  <AssignmentForm
                    initialValues={{
                      title: assignment.title,
                      description: assignment.description,
                      dueDate: assignment.dueDate,
                    }}
                    onSubmit={(vals) =>
                      handleEditSave(assignment._id, { ...assignment, ...vals })
                    }
                    onCancel={() => setEditingId(null)}
                    submitLabel="Update Assignment"
                  />
                </div>
              ) : (
                <div key={assignment._id} className="space-y-3">
                  <AssignmentCard
                    assignment={assignment}
                    onEdit={() => {
                      setShowCreateForm(false);
                      setEditingId(assignment._id);
                    }}
                    onDelete={(id) => openConfirmModal(id, status.Deleted)}
                    onPublish={(id) => openConfirmModal(id, status.Published)}
                    onComplete={(id) => openConfirmModal(id, status.Completed)}
                    onViewSubmissions={handleViewSubmissions}
                  />

                  {assignment._id === openSubmissionsId &&
                    assignment.status === "Published" && (
                      <AssignmentSubmissions
                        items={submissions.items}
                        loading={submissions.loading}
                        error={submissions.error}
                        onReload={submissions.load}
                        onToggleReviewed={submissions.toggleReviewed}
                      />
                    )}
                </div>
              )
            )
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmModal}
        modalConfig={modalConfig[modalType] || { heading: "", type: "" }}
      />
    </div>
  );
}
