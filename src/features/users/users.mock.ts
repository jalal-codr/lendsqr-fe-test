import type { UserDetails } from "./users.types";

const MOCKAROO_URL = "https://my.api.mockaroo.com/users.json?key=051a0280";

/**
 * Fetches 500 users from the Mockaroo endpoint.
 */
export const fetchUsers = async (): Promise<UserDetails[]> => {
  try {
    const response = await fetch(MOCKAROO_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const data: UserDetails[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Return an empty array or fallback data so the app doesn't crash
    return [];
  }
};