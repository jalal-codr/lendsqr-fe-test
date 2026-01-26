import { fetchUsers } from "./users.mock";
import type {
  UserDetails,
  UserSummary,
  GetUsersParams,
} from "./users.types";

const simulateDelay = (ms = 600) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Get paginated users from the Mockaroo API
 */
export const getUsers = async (
  params: GetUsersParams
): Promise<{
  data: UserSummary[];
  total: number;
}> => {
  const allUsers = await fetchUsers();

  const {
    page = 1,
    limit = 10, // Default page size
  } = params;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedUsers = allUsers.slice(startIndex, endIndex);

  return {
    data: paginatedUsers.map((user) => ({
      id: user.id,
      organization: user.organization,
      username: user.profile.username,
      email: user.profile.email,
      phoneNumber: user.profile.phoneNumber,
      dateJoined: user.dateJoined,
      status: user.status,
    })),
    total: allUsers.length,
  };
};

/**
 * Get single user details from the Mockaroo API
 */
export const getUserById = async (
  id: string
): Promise<UserDetails | null> => {
  const allUsers = await fetchUsers();
  await simulateDelay();

  return allUsers.find((u) => u.id === id) || null;
};