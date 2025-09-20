import { useCallback, useEffect, useReducer } from "react";
import api from "../utils/api";

const initialState = {
  items: [],
  loading: false,
  error: "",
  success: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: "", success: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, items: action.payload, error: "" };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_SUCCESS":
      return {
        ...state,
        items: [action.payload, ...state.items],
        success: "Assignment created successfully",
        error: "",
      };
    case "UPDATE_SUCCESS":
      return {
        ...state,
        items: state.items.map((a) => (a._id === action.payload._id ? action.payload : a)),
        success: "Assignment updated successfully",
        error: "",
      };
    case "DELETE_SUCCESS":
      return {
        ...state,
        items: state.items.filter((a) => a._id !== action.payload),
        success: "Assignment deleted successfully",
        error: "",
      };
    case "STATUS_SUCCESS":
      return {
        ...state,
        items: state.items.map((a) => (a._id === action.payload._id ? action.payload : a)),
        success: `Status updated to ${action.payload.status}`,
        error: "",
      };
    case "CLEAR_MESSAGES":
      return { ...state, error: "", success: "" };
    default:
      return state;
  }
}

export function useAssignments() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchAssignments = useCallback(async () => {
    try {
      dispatch({ type: "FETCH_START" });
      const res = await api.get("/assignments");
      dispatch({ type: "FETCH_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: "Failed to fetch assignments" });
    }
  }, []);

  const createAssignment = useCallback(async (payload) => {
    try {
      const res = await api.post("/assignments", payload);
      dispatch({ type: "CREATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: "Failed to create assignment" });
    }
  }, []);

  const updateAssignment = useCallback(async (id, payload) => {
    try {
      const res = await api.put(`/assignments/${id}`, payload);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: "Failed to update assignment" });
    }
  }, []);

  const deleteAssignment = useCallback(async (id) => {
    try {
      await api.delete(`/assignments/${id}`);
      dispatch({ type: "DELETE_SUCCESS", payload: id });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: "Failed to delete assignment" });
    }
  }, []);

  const updateStatus = useCallback(async (id, status) => {
    try {
      const res = await api.put(`/assignments/${id}/status`, { status });
      dispatch({ type: "STATUS_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: "Failed to update assignment status" });
    }
  }, []);

  const clearMessages = useCallback(() => {
    dispatch({ type: "CLEAR_MESSAGES" });
  }, []);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return {
    ...state,
    fetchAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    updateStatus,
    clearMessages,
  };
}
