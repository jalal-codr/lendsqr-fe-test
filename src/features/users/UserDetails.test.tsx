import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import UserDetails from "./UserDetails";
import UserHeaderTabs from "../../components/common/UserHeaderTabs";
import InfoSection from "../../components/common/InfoSection";
import { useUserDetails } from "../../hooks/useLocalStorage";
import type { UserDetails as UserDetailsType } from "./users.types";

vi.mock("../../hooks/useLocalStorage", () => ({
  useUserDetails: vi.fn(),
}));

const mockUser: UserDetailsType = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  organization: "Lendsqr",
  username: "grace_effiong",
  email: "grace@lendsqr.com",
  phoneNumber: "07012345678",
  status: "Active",
  dateJoined: "2020-04-30T10:00:00Z",
  profile: {
    firstName: "Grace",
    lastName: "Effiong",
    username: "grace_effiong",
    phoneNumber: "07012345678",
    email: "grace@lendsqr.com",
    bvn: "12345678901",
    gender: "Female",
    maritalStatus: "Single",
    children: 0,
    residence: "Apartment",
  },
  account: {
    tier: 2,
    balance: 200000.50,
    accountNumber: 9876543210,
    bankName: "Providus Bank",
  },
  education: {
    level: "B.Sc",
    employmentStatus: "Employed",
    sector: "FinTech",
    duration: "2 years",
    officeEmail: "grace.effiong@company.com",
    monthlyIncome: {
      min: 100000,
      max: 200000,
    },
    loanRepayment: 20000,
  },
  socials: {
    twitter: "grace_effiong",
    facebook: "Grace Effiong",
    instagram: "grace_effiong",
  },
  guarantors: {
    fullName: "John Doe",
    phoneNumber: "08012345678",
    email: "john@test.com",
    relationship: "Brother",
  },
};

describe("UserDetails Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  it("should display 'no user selected' message when selectedUser is null", () => {
    vi.mocked(useUserDetails).mockReturnValue({
      selectedUser: null,
      saveUserDetails: vi.fn(),
      clearUserDetails: vi.fn(),
      getSavedDetails: vi.fn(),
    });

    renderWithRouter(<UserDetails />);

    expect(screen.getByText(/no user selected/i)).toBeInTheDocument();
    expect(screen.getByText(/please select a user from the users list/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to users/i })).toBeInTheDocument();
  });

  it("should render user details correctly when user is selected", () => {
    vi.mocked(useUserDetails).mockReturnValue({
      selectedUser: mockUser,
      saveUserDetails: vi.fn(),
      clearUserDetails: vi.fn(),
      getSavedDetails: vi.fn(),
    });

    renderWithRouter(<UserDetails />);

    // Header
    expect(screen.getByText("User Details")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /blacklist user/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /activate user/i })).toBeInTheDocument();

    // Personal Information - use getAllByText for duplicate text
    const graceEffiongElements = screen.getAllByText("Grace Effiong");
    expect(graceEffiongElements.length).toBeGreaterThan(0);
    
    expect(screen.getByText("07012345678")).toBeInTheDocument();
    expect(screen.getByText("grace@lendsqr.com")).toBeInTheDocument();
    expect(screen.getByText("12345678901")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();
    expect(screen.getByText("Single")).toBeInTheDocument();
    expect(screen.getByText("Apartment")).toBeInTheDocument();

    // Education and Employment
    expect(screen.getByText("B.Sc")).toBeInTheDocument();
    expect(screen.getByText("Employed")).toBeInTheDocument();
    expect(screen.getByText("FinTech")).toBeInTheDocument();
    expect(screen.getByText("2 years")).toBeInTheDocument();
    expect(screen.getByText("grace.effiong@company.com")).toBeInTheDocument();
    expect(screen.getByText("₦100,000 - ₦200,000")).toBeInTheDocument();
    expect(screen.getByText("₦20,000")).toBeInTheDocument();


    const socialHandles = screen.getAllByText("@grace_effiong");
    expect(socialHandles.length).toBe(2); 

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("08012345678")).toBeInTheDocument();
    expect(screen.getByText("john@test.com")).toBeInTheDocument();
    expect(screen.getByText("Brother")).toBeInTheDocument();
  });

it("should handle missing optional fields gracefully", () => {
  const userWithMissingFields: UserDetailsType = {
    ...mockUser,
    education: {
      ...mockUser.education,
      monthlyIncome: undefined as unknown as { min: number; max: number },
      loanRepayment: undefined as unknown as number,
    },
    socials: {
      twitter: "",
      facebook: "",
      instagram: "",
    },
  };

  vi.mocked(useUserDetails).mockReturnValue({
    selectedUser: userWithMissingFields,
    saveUserDetails: vi.fn(),
    clearUserDetails: vi.fn(),
    getSavedDetails: vi.fn(),
  });

  renderWithRouter(<UserDetails />);

  const naTags = screen.getAllByText("N/A");
  expect(naTags.length).toBeGreaterThan(0);
});

  it("should have working back to users link", () => {
    vi.mocked(useUserDetails).mockReturnValue({
      selectedUser: mockUser,
      saveUserDetails: vi.fn(),
      clearUserDetails: vi.fn(),
      getSavedDetails: vi.fn(),
    });

    renderWithRouter(<UserDetails />);

    const backLink = screen.getByRole("link", { name: /back to users/i });
    expect(backLink).toHaveAttribute("href", "/users");
  });
});

describe("UserHeaderTabs Component", () => {
  const user = userEvent.setup();

  it("should render user header information correctly", () => {
    render(<UserHeaderTabs user={mockUser} />);

    expect(screen.getByText("Grace Effiong")).toBeInTheDocument();
    expect(screen.getByText("123E4567")).toBeInTheDocument(); 
    expect(screen.getByText("₦200,000.50")).toBeInTheDocument();
    expect(screen.getByText("9876543210 / Providus Bank")).toBeInTheDocument();
  });

  it("should render correct number of stars based on tier", () => {
    render(<UserHeaderTabs user={mockUser} />);

    const stars = screen.getAllByAltText(/star/i);
    expect(stars).toHaveLength(3);

    const filledStars = screen.getAllByAltText("Filled star");
    const emptyStars = screen.getAllByAltText("Empty star");
    expect(filledStars).toHaveLength(2);
    expect(emptyStars).toHaveLength(1);
  });

  it("should render all tabs", () => {
    render(<UserHeaderTabs user={mockUser} />);

    expect(screen.getByText("General Details")).toBeInTheDocument();
    expect(screen.getByText("Documents")).toBeInTheDocument();
    expect(screen.getByText("Bank Details")).toBeInTheDocument();
    expect(screen.getByText("Loans")).toBeInTheDocument();
    expect(screen.getByText("Savings")).toBeInTheDocument();
    expect(screen.getByText("App and System")).toBeInTheDocument();
  });

  it("should change active tab when clicked", async () => {
    render(<UserHeaderTabs user={mockUser} />);

    const generalTab = screen.getByText("General Details");
    const documentsTab = screen.getByText("Documents");

    expect(generalTab.className).toContain("activeTab");
    expect(documentsTab.className).not.toContain("activeTab");

    await user.click(documentsTab);

    expect(documentsTab.className).toContain("activeTab");
    expect(generalTab.className).not.toContain("activeTab");
  });

  it("should change tab on keyboard Enter", async () => {
    render(<UserHeaderTabs user={mockUser} />);

    const loansTab = screen.getByText("Loans");
    
    loansTab.focus();
    await user.keyboard("{Enter}");

    expect(loansTab.className).toContain("activeTab");
  });

  it("should change tab on keyboard Space", async () => {
    render(<UserHeaderTabs user={mockUser} />);

    const savingsTab = screen.getByText("Savings");
    
    savingsTab.focus();
    await user.keyboard(" ");

    expect(savingsTab.className).toContain("activeTab");
  });
});

describe("InfoSection Component", () => {
  it("should render section with title and items", () => {
    const items: [string, string][] = [
      ["FULL NAME", "John Doe"],
      ["EMAIL", "john@test.com"],
      ["PHONE", "08012345678"],
    ];

    render(<InfoSection title="Personal Information" items={items} />);

    expect(screen.getByText("Personal Information")).toBeInTheDocument();
    expect(screen.getByText("FULL NAME")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("EMAIL")).toBeInTheDocument();
    expect(screen.getByText("john@test.com")).toBeInTheDocument();
    expect(screen.getByText("PHONE")).toBeInTheDocument();
    expect(screen.getByText("08012345678")).toBeInTheDocument();
  });

  it("should render section without title", () => {
    const items: [string, string][] = [
      ["LABEL", "Value"],
    ];

    render(<InfoSection items={items} />);

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByText("LABEL")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
  });

  it("should render multiple items in grid", () => {
    const items: [string, string][] = [
      ["ITEM 1", "Value 1"],
      ["ITEM 2", "Value 2"],
      ["ITEM 3", "Value 3"],
      ["ITEM 4", "Value 4"],
    ];

    const { container } = render(<InfoSection title="Test Section" items={items} />);

    expect(screen.getByText("ITEM 1")).toBeInTheDocument();
    expect(screen.getByText("ITEM 2")).toBeInTheDocument();
    expect(screen.getByText("ITEM 3")).toBeInTheDocument();
    expect(screen.getByText("ITEM 4")).toBeInTheDocument();

    const itemElements = container.querySelectorAll('[class*="item"]');
    expect(itemElements.length).toBe(4);
  });
});