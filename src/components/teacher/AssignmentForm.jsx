import { useState, useEffect } from "react";
import ErrorMessage from "../common/ErrorMessage";

const defaultValues = { title: "", description: "", dueDate: "" };

export default function AssignmentForm({
  initialValues = defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "Save",
}) {
  const [values, setValues] = useState(initialValues);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setValidationError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.title) {
      setValidationError("Title is required.");
      setLoading(false);
      return;
    }
    if (!values.description) {
      setValidationError("Description is required.");
      setLoading(false);
      return;
    }
    if (!values.dueDate) {
      setValidationError("Due Date is required.");
      setLoading(false);
      return;
    }
    onSubmit(values);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {validationError && (
        <ErrorMessage
          error={validationError}
          onDismiss={() => setValidationError("")}
        />
      )}
      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="Assignment Title"
          value={values.title}
          onChange={handleChange}
          className="w-full rounded-none border border-zinc-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Assignment Description"
          value={values.description}
          onChange={handleChange}
          className="h-24 w-full rounded-none border border-zinc-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">
          Due Date
        </label>
        <input
          type="date"
          name="dueDate"
          value={(values.dueDate || "").toString().split("T")[0]}
          onChange={handleChange}
          onClick={(e) => {
            if (e.currentTarget.showPicker) e.currentTarget.showPicker();
          }}
          onFocus={(e) => {
            if (e.currentTarget.showPicker) e.currentTarget.showPicker();
          }}
          min={today}
          className="w-4xs rounded-none border border-zinc-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
          required
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-none bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-none border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
