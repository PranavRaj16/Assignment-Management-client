export const ASSIGNMENT_STATUS = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  COMPLETED: "Completed",
};

export const USER_ROLES = {
  TEACHER: "teacher",
  STUDENT: "student",
};

export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || "Assignment Portal",
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:8081/api",
};
