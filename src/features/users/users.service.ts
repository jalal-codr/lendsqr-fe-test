import { db } from "../../utils/db";
import { fetchUsers } from "./users.mock";
import type {
  UserDetails,
  GetUsersParams,
} from "./users.types";

let hasFetchedInMemory = false;

export const getUsers = async (
  params: GetUsersParams
): Promise<{
  data: UserDetails[]; 
  total: number;
}> => {
  const { page = 1, limit = 10 } = params;

  const localCount = await db.users.count();

  if (localCount === 0 || !hasFetchedInMemory) {
    const allUsers = await fetchUsers(); 

    await db.transaction('rw', db.users, async () => {
      await db.users.clear();
      await db.users.bulkAdd(allUsers);
    });

    hasFetchedInMemory = true;
  }

  const startIndex = (page - 1) * limit;

  const paginatedUsers = await db.users
    .offset(startIndex)
    .limit(limit)
    .toArray() as UserDetails[];

  const total = await db.users.count();

  return {
    data: paginatedUsers, 
    total,
  };
};

export const getUserById = async (id: string): Promise<UserDetails | null> => {
  const user = await db.users.get(id) as UserDetails | undefined;
  return user || null;
};