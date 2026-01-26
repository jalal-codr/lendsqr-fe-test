import { describe, it, expect, vi, beforeEach } from "vitest";
import "fake-indexeddb/auto"; 
import { getUsers } from "./users.service";
import { fetchUsers } from "./users.mock";
import { db } from "../../utils/db";
import type { UserDetails } from "./users.types";

vi.mock("./users.mock", () => ({
  fetchUsers: vi.fn(),
}));

describe("Users Service", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    await db.users.clear(); // Resets IndexedDB state
  });

  const createMockUser = (id: string, index: number): UserDetails => ({
    id,
    organization: "Lendsqr",
    username: `user_${index}`,
    email: `user${index}@test.com`,
    phoneNumber: `070${index}`,
    dateJoined: "2020-05-15T10:00:00Z",
    status: "Active",
    profile: {
      firstName: "Test",
      lastName: "User",
      username: `user_${index}`,
      email: `user${index}@test.com`,
      phoneNumber: `070${index}`,
      bvn: "123456789",
      gender: "Male",
      maritalStatus: "Single",
      children: 0,
      residence: "Lagos",
    },
    account: {
      tier: 1,
      balance: 50000,
      accountNumber: 123456789,
      bankName: "Providus",
    },
    education: {
      level: "BSc",
      employmentStatus: "Employed",
      sector: "Fintech",
      duration: "2 years",
      officeEmail: `work${index}@test.com`,
      monthlyIncome: { min: 1000, max: 5000 },
      loanRepayment: 500,
    },
    socials: {
      twitter: "@test",
      facebook: "fb/test",
      instagram: "@test_ig",
    },
    guarantors: {
      fullName: "John Guarantor",
      phoneNumber: "0801234567",
      email: "jg@test.com",
      relationship: "Brother",
    },
  });

  it("should correctly paginate and map raw user data", async () => {
    // Generate 15 distinct users
    const mockRawData = Array.from({ length: 15 }, (_, i) => 
      createMockUser((i + 1).toString(), i + 1)
    );
    
    vi.mocked(fetchUsers).mockResolvedValue(mockRawData);

    const result = await getUsers({ page: 2, limit: 5 });
    
    // Page 1: IDs 1-5 | Page 2: IDs 6-10
    expect(result.data.length).toBe(5);
    expect(result.data[0].id).toBe("6"); 
    expect(result.total).toBe(15);
  });

  it("should cache data and not re-fetch if DB is populated", async () => {
    const singleUser = [createMockUser("1", 1)];
    vi.mocked(fetchUsers).mockResolvedValue(singleUser);

    // Initial load
    await getUsers({ page: 1, limit: 10 });
    expect(fetchUsers).toHaveBeenCalledTimes(1);

    // Subsequent load - should skip fetchUsers
    await getUsers({ page: 1, limit: 10 });
    expect(fetchUsers).toHaveBeenCalledTimes(1); 
  });
});