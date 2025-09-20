import { useCallback, useEffect, useReducer } from "react";
import api from "../utils/api";

const initial = {
  items: [],
  loading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, error: "" };
    case "LOAD_SUCCESS":
      return { ...state, loading: false, items: action.payload, error: "" };
    case "LOAD_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "TOGGLE_REVIEWED":
      return {
        ...state,
        items: state.items.map((s) =>
          s._id === action.payload._id ? { ...s, ...action.payload } : s
        ),
      };
    default:
      return state;
  }
}

export function useSubmissions(assignmentId, enabled = false) {
  const [state, dispatch] = useReducer(reducer, initial);

  const load = useCallback(async () => {
    if (!assignmentId) return;
    try {
      dispatch({ type: "LOAD_START" });
      const res = await api.get(`/assignments/${assignmentId}/submissions`);
      dispatch({ type: "LOAD_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOAD_ERROR", payload: "Failed to load submissions" });
    }
  }, [assignmentId]);

  const toggleReviewed = useCallback(async (submissionId, reviewed) => {
    try {
      const res = await api.patch(`/submissions/${submissionId}`, { reviewed });
      dispatch({ type: "TOGGLE_REVIEWED", payload: res.data });
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (enabled) load();
  }, [enabled, load]);

  return { ...state, load, toggleReviewed };
}
