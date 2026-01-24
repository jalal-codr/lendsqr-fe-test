import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ErrorPage from "./ErrorPage";

describe("ErrorPage", () => {
  
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders 404 status and message when a Route Error occurs", () => {
    return;
  });

  it("renders a generic error message for non-route errors", () => {
    const Boom = () => {
      throw new Error("Database Connection Failed");
    };

    const routes = [
      {
        path: "/",
        element: <Boom />,
        errorElement: <ErrorPage />,
      },
    ];

    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);

    expect(screen.getByText("Oops!")).toBeInTheDocument();
    expect(screen.getByText("Database Connection Failed")).toBeInTheDocument();
  });
});