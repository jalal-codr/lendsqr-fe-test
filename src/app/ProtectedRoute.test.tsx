import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProtectedRoute from "./ProtectedRoute";
import * as authService from "../features/auth/auth.service";

vi.mock("../features/auth/auth.service", () => ({
  getAuthUser: vi.fn(),
}));

describe("ProtectedRoute Navigation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const routes = [
    { path: "/login", element: <div>Login Page</div> },
    {
      element: <ProtectedRoute />,
      children: [
        { path: "/", element: <div>Dashboard Content</div> },
        { path: "/users", element: <div>Users List</div> },
        { path: "/users/:id", element: <div>User Detail View</div> },
      ],
    },
  ];

  it("blocks access to the Dashboard (/) and redirects to login", () => {
    vi.mocked(authService.getAuthUser).mockReturnValue(null);

    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);

    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.queryByText("Dashboard Content")).not.toBeInTheDocument();
  });

  it("blocks access to the Users page (/users) and redirects to login", () => {
    vi.mocked(authService.getAuthUser).mockReturnValue(null);

    const router = createMemoryRouter(routes, { initialEntries: ["/users"] });
    render(<RouterProvider router={router} />);

    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.queryByText("Users List")).not.toBeInTheDocument();
  });

  it("blocks access to User Details (/users/123) and redirects to login", () => {
    vi.mocked(authService.getAuthUser).mockReturnValue(null);

    const router = createMemoryRouter(routes, { initialEntries: ["/users/123"] });
    render(<RouterProvider router={router} />);

    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.queryByText("User Detail View")).not.toBeInTheDocument();
  });

  it("allows access to User Details when authenticated", () => {
    vi.mocked(authService.getAuthUser).mockReturnValue({ id: 1, name: "Admin" });

    const router = createMemoryRouter(routes, { initialEntries: ["/users/123"] });
    render(<RouterProvider router={router} />);

    expect(screen.getByText("User Detail View")).toBeInTheDocument();
    expect(screen.queryByText("Login Page")).not.toBeInTheDocument();
  });
});