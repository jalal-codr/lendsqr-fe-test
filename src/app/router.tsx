import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/Login";
import Users from "../features/users/Users";
import UserDetails from "../features/users/UserDetails";
import Layout from "../components/layout/Layout";
import ErrorPage from "../features/error/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "dashboard", element: <div>Dashboard</div> },
          { path: "users", element: <Users /> },
          { path: "users/:id", element: <UserDetails /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);