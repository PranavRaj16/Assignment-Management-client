import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";

const StudentDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [assignmentsResponse, submissionsResponse] = await Promise.all([
        api.get("/assignments"),
        api.get("/submissions"),
      ]);

      setAssignments(assignmentsResponse.data);
      setSubmissions(submissionsResponse.data);
      setError("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async (assignmentId, answer) => {
    try {
      const response = await api.post("/submissions", {
        assignmentId,
        answer,
      });

      setSubmissions([...submissions, response.data]);
      setError("");
      return { success: true };
    } catch (error) {
      console.error("Error submitting answer:", error);
      const message =
        error.response?.data?.message || "Failed to submit answer";
      setError(message);
      return { success: false, message };
    }
  };

  const hasSubmitted = (assignmentId) => {
    return submissions.some((sub) => sub.assignmentId._id === assignmentId);
  };

  const getSubmission = (assignmentId) => {
    return submissions.find((sub) => sub.assignmentId._id === assignmentId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Student Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Assignments
          </h2>
          <p className="text-gray-600 mt-1">
            You have {assignments.length} published assignment
            {assignments.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="space-y-6">
          {assignments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No assignments
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                No published assignments are currently available.
              </p>
            </div>
          ) : (
            assignments.map((assignment) => (
              <AssignmentCard
                key={assignment._id}
                assignment={assignment}
                onSubmit={submitAnswer}
                hasSubmitted={hasSubmitted(assignment._id)}
                submission={getSubmission(assignment._id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const AssignmentCard = ({ assignment, onSubmit, hasSubmitted, submission }) => {
  const [answer, setAnswer] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) {
      setError("Please provide an answer");
      return;
    }

    setSubmitting(true);
    const result = await onSubmit(assignment._id, answer.trim());

    if (result.success) {
      setAnswer("");
      setShowForm(false);
      setError("");
    } else {
      setError(result.message);
    }
    setSubmitting(false);
  };

  const daysUntilDue = Math.ceil(
    (new Date(assignment.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {assignment.title}
            </h3>
            <p className="text-gray-600 mt-2 leading-relaxed">
              {assignment.description}
            </p>
          </div>

          {hasSubmitted && (
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Submitted
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
          <span
            className={`font-medium ${
              daysUntilDue < 0
                ? "text-red-600"
                : daysUntilDue <= 3
                ? "text-orange-600"
                : "text-gray-600"
            }`}
          >
            {daysUntilDue < 0
              ? "Overdue"
              : daysUntilDue === 0
              ? "Due Today"
              : `${daysUntilDue} days remaining`}
          </span>
        </div>

        {!hasSubmitted && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            disabled={daysUntilDue < 0}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            {daysUntilDue < 0 ? "Assignment Overdue" : "Submit Answer"}
          </button>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Answer
              </label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={submitting || !answer.trim()}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                {submitting ? "Submitting..." : "Submit Answer"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setAnswer("");
                  setError("");
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {hasSubmitted && submission && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-sm font-semibold text-green-800">
                Your Submission
              </h4>
              <span className="text-xs text-green-600">
                Submitted {new Date(submission.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-green-700 text-sm leading-relaxed">
              {submission.answer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
