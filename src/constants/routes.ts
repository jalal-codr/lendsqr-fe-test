export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/",
  USERS: "/users",
  USER_DETAILS: "/users/:id",
  GET_USER_DETAILS: (id: string | number) => `/users/${id}`,
} as const;