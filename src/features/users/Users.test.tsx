import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Users from "./Users";
import { getUsers, getUserById } from "./users.service";
import type { UserDetails } from "./users.types";

vi.mock("./users.service", () => ({
  getUsers: vi.fn(),
  getUserById: vi.fn(),
}));

const mockUser: UserDetails = {
  id: "1",
  organization: "Lendsqr",
  username: "grace_1",
  email: "g1@test.com",
  phoneNumber: "0701",
  status: "Active",
  dateJoined: "2020-04-30T10:00:00Z",
  profile: {
    firstName: "Grace",
    lastName: "Sample",
    username: "grace_1",
    phoneNumber: "0701",
    email: "g1@test.com",
    bvn: "123456789",
    gender: "Female",
    maritalStatus: "Single",
    children: 0,
    residence: "Lagos",
  },
  account: {
    tier: 1,
    balance: 200000,
    accountNumber: 1234567890,
    bankName: "Providus Bank",
  },
  education: {
    level: "BSc",
    employmentStatus: "Employed",
    sector: "Fintech",
    duration: "2 years",
    officeEmail: "grace@lendsqr.com",
    monthlyIncome: {
      min: 100000,
      max: 200000,
    },
    loanRepayment: 20000,
  },
  socials: {
    twitter: "@grace",
    facebook: "@grace",
    instagram: "@grace",
  },
  guarantors: {
    fullName: "John Doe",
    phoneNumber: "080123",
    email: "john@test.com",
    relationship: "Brother",
  },
};

const mockUsersPage1 = {
  data: [mockUser],
  total: 50,
};

describe("Users Component Integration", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getUserById).mockResolvedValue(mockUser);
  });

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(
      <MemoryRouter initialEntries={["/users"]}>
        <Routes>
          <Route path="/users" element={ui} />
          <Route path="/users/:id" element={<div data-testid="details-page">User Details Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("should fetch users and display them in the table", async () => {
    vi.mocked(getUsers).mockResolvedValueOnce(mockUsersPage1);

    renderWithRouter(<Users />);

    await waitFor(() => {
      expect(screen.getByText("grace_1")).toBeInTheDocument();
    });

    expect(getUsers).toHaveBeenCalledWith(expect.objectContaining({
      page: 1,
      limit: 10,
    }));

    const table = screen.getByRole("table");
    expect(within(table).getByText("grace_1")).toBeInTheDocument();
    expect(screen.getByText(/out of 50/i)).toBeInTheDocument();
  });

  it("should apply filters and reset page to 1", async () => {
    vi.mocked(getUsers).mockResolvedValue(mockUsersPage1);

    renderWithRouter(<Users />);

    await waitFor(() => expect(screen.getByText("grace_1")).toBeInTheDocument());

    const filterIcons = screen.getAllByAltText("filter");
    await user.click(filterIcons[0]);

    const usernameInput = screen.getByPlaceholderText("User");
    await user.type(usernameInput, "smith");

    const filterButton = screen.getByRole("button", { name: /filter/i });
    await user.click(filterButton);

    expect(getUsers).toHaveBeenCalledWith(expect.objectContaining({
      username: "smith",
      page: 1
    }));
  });

  it("should navigate to user details page when view details is clicked", async () => {
    vi.mocked(getUsers).mockResolvedValue(mockUsersPage1);

    renderWithRouter(<Users />);

    await waitFor(() => expect(screen.getByText("grace_1")).toBeInTheDocument());

    const actionBtn = screen.getByRole("button", { name: /actions/i });
    await user.click(actionBtn);

    const viewDetailsBtn = screen.getByText(/view details/i);
    await user.click(viewDetailsBtn);

    expect(screen.getByTestId("details-page")).toBeInTheDocument();
  });

  it("should update page size and reset to page 1 when select changes", async () => {
    vi.mocked(getUsers).mockResolvedValue(mockUsersPage1);

    renderWithRouter(<Users />);

    await waitFor(() => expect(screen.getByText("grace_1")).toBeInTheDocument());

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "50");

    expect(getUsers).toHaveBeenCalledWith(expect.objectContaining({ limit: 50, page: 1 }));
  });

  it("should render error state when API call fails", async () => {
    const errorMessage = "Failed to load users. Please check your network or API key.";
    vi.mocked(getUsers).mockRejectedValueOnce(new Error("Network Error"));

    renderWithRouter(<Users />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});