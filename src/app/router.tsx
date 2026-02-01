import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/Login";
import Users from "../features/users/Users";
import UserDetails from "../features/users/UserDetails";
import Layout from "../components/layout/Layout";
import ErrorPage from "../features/error/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "../constants/routes";

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Layout />,
        children: [
          { 
            index: true, 
            element: <div>Dashboard</div> 
          },
          { 
            path: ROUTES.USERS.replace("/", ""),
            element: <Users /> 
          },
          { 
            path: ROUTES.USER_DETAILS.replace("/", ""),
            element: <UserDetails /> 
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);