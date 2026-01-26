import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Users from "./Users";
import { getUsers } from "./users.service";

// 1. Mock the service layer
vi.mock("./users.service", () => ({
  getUsers: vi.fn(),
}));

const mockUsersPage1 = {
  data: [
    { 
      id: "1", 
      organization: "Lendsqr", 
      username: "grace_1", 
      email: "g1@test.com", 
      phoneNumber: "0701", 
      dateJoined: "May 15, 2020", 
      status: "Active" as const 
    },
  ],
  total: 50,
};

const mockUsersPage2 = {
  data: [
    { 
      id: "11", 
      organization: "Iredia", 
      username: "smith_11", 
      email: "s11@test.com", 
      phoneNumber: "08076543210", 
      dateJoined: "May 20, 2020", 
      status: "Inactive" as const 
    },
    { 
      id: "12", 
      organization: "Lendsqr", 
      username: "jane_doe", 
      email: "jane@lendsqr.com", 
      phoneNumber: "09012345678", 
      dateJoined: "June 10, 2021", 
      status: "Blacklisted" as const 
    },
    { 
      id: "13", 
      organization: "Lendsqr", 
      username: "robert_z", 
      email: "rob@test.com", 
      phoneNumber: "07033445566", 
      dateJoined: "July 02, 2022", 
      status: "Pending" as const 
    }
  ],
  total: 50,
};

describe("Users Component Integration", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch users and display them in the table", async () => {
    vi.mocked(getUsers).mockResolvedValueOnce(mockUsersPage1);

    render(<Users />);

    expect(getUsers).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
    });

    await waitFor(() => {
      expect(screen.getByText("grace_1")).toBeInTheDocument();
    });

    const table = screen.getByRole("table");
    const tableBody = within(table).getAllByRole("rowgroup")[1]; 

    expect(within(tableBody).getByText("grace_1")).toBeInTheDocument();
    expect(within(tableBody).getByText("Lendsqr")).toBeInTheDocument();
    
    const pagination = screen.getByText(/out of 50/i);
    expect(pagination).toBeInTheDocument();
  });

  it("should navigate to the next page when pagination button is clicked", async () => {
    vi.mocked(getUsers)
      .mockResolvedValueOnce(mockUsersPage1)
      .mockResolvedValueOnce(mockUsersPage2);

    render(<Users />);

    await waitFor(() => expect(screen.getByText("grace_1")).toBeInTheDocument());

    const nextButton = screen.getByRole("button", { name: ">" });
    await user.click(nextButton);

    expect(getUsers).toHaveBeenCalledWith(expect.objectContaining({ page: 2 }));

    await waitFor(() => {
      expect(screen.getByText("smith_11")).toBeInTheDocument();
    });
    expect(screen.queryByText("grace_1")).not.toBeInTheDocument();
  });

  it("should update page size and reset to page 1 when select changes", async () => {
    vi.mocked(getUsers).mockResolvedValue(mockUsersPage1);

    render(<Users />);

    await waitFor(() => expect(screen.getByText("grace_1")).toBeInTheDocument());

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "50");

    expect(getUsers).toHaveBeenCalledWith(expect.objectContaining({ limit: 50, page: 1 }));
  });

  it("should render error state when API call fails", async () => {
    const errorMessage = "Failed to load users. Please check your network or API key.";
    vi.mocked(getUsers).mockRejectedValueOnce(new Error("Network Error"));

    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});