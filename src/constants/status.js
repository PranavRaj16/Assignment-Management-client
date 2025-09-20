export const status = {
  Draft: "Draft",
  Published: "Published",
  Completed: "Completed",
  Deleted: "Deleted",
  Submit: "Submit",
};

export const modalConfig = {
  [status.Published]: { heading: "Publish", type: "published" },
  [status.Deleted]: { heading: "Delete", type: "deleted" },
  [status.Completed]: { heading: "Complete", type: "completed" },
  [status.Submit]: { heading: "Submit", type: "submit" },
};
