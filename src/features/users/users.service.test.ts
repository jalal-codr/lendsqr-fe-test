import { describe, it, expect, vi, beforeEach } from "vitest";
import { getUsers } from "./users.service";
import { fetchUsers } from "./users.mock";
import type { UserDetails } from "./users.types";

vi.mock("./users.mock", () => ({
  fetchUsers: vi.fn(),
}));

describe("Users Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should correctly paginate and map raw user data", async () => {
    const mockRawData = Array.from({ length: 15 }, (_, i) => ({
      id: `${i + 1}`,
      organization: "Lendsqr",
      profile: {
        username: `user_${i + 1}`,
        email: `user${i + 1}@test.com`,
        phoneNumber: "0701",
      },
      dateJoined: "May 15, 2020",
      status: "Active",
    })) as unknown as UserDetails[];

    vi.mocked(fetchUsers).mockResolvedValue(mockRawData);
    const result = await getUsers({ page: 2, limit: 5 });
    expect(result.data.length).toBe(5);
    expect(result.data[0].username).toBe("user_6");
    expect(result.total).toBe(15);
    
    expect(result.data[0]).toEqual({
      id: "6",
      organization: "Lendsqr",
      username: "user_6",
      email: "user6@test.com",
      phoneNumber: "0701",
      dateJoined: "May 15, 2020",
      status: "Active",
    });
  });

  it("should throw an error if fetchUsers fails", async () => {
    const apiError = new Error("API Error");
    vi.mocked(fetchUsers).mockRejectedValue(apiError);

    await expect(getUsers({ page: 1, limit: 10 })).rejects.toThrow("API Error");
  });
});