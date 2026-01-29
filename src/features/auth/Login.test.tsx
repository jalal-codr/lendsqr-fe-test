import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi, describe, it, expect, beforeEach } from "vitest";
import Login from "./Login";
import { useAuth } from "../../hooks/useAuth";
import type{ Mock } from "vitest";

vi.mock("../../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Login Component", () => {
  const mockSignIn = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as Mock).mockReturnValue({
      signIn: mockSignIn,
    });
  });

  it("should render all input fields and the logo", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByAltText(/lendsqr/i)).toBeInTheDocument();
  });

    it("should show an error if the email format is invalid", async () => {
        render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: "not-an-email" },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
        target: { value: "password123" },
        });

        const form = screen.getByLabelText("login-form");
        fireEvent.submit(form);

        // Check for the specific validation message
        const errorMsg = await screen.findByText(/please enter a valid email address/i);
        expect(errorMsg).toBeInTheDocument();
        
        // Ensure the API wasn't called
        expect(mockSignIn).not.toHaveBeenCalled();
    });

  it("should show an error if fields are empty and form is submitted", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const form = screen.getByLabelText("login-form");
    fireEvent.submit(form);

    const errorMsg = await screen.findByText(/all fields are required/i);
    expect(errorMsg).toBeInTheDocument();
    
    expect(mockSignIn).not.toHaveBeenCalled();
  });

  it("should toggle password visibility when SHOW/HIDE is clicked", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const passwordInput = screen.getByPlaceholderText(/password/i);
    const toggleBtn = screen.getByRole("button", { name: /show/i });


    expect(passwordInput).toHaveAttribute("type", "password");


    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: /hide/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /hide/i }));
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("should call signIn and navigate to dashboard on successful login", async () => {
    mockSignIn.mockResolvedValueOnce(true);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "user@lendsqr.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });

    const form = screen.getByLabelText("login-form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("user@lendsqr.com", "password123");
      expect(mockNavigate).toHaveBeenCalledWith("/users");
    });
  });
});