import { db } from "../../utils/db";
import { fetchUsers } from "./users.mock";
import type {
  UserDetails,
  GetUsersParams,
} from "./users.types";
import type { UsersFilterValues } from "../../components/common/UsersFilter";

let hasFetchedInMemory = false;

export const getUsers = async (
  params: GetUsersParams & UsersFilterValues
): Promise<{
  data: UserDetails[]; 
  total: number;
}> => {
  const { 
    page = 1, 
    limit = 10, 
    organization, 
    username, 
    email, 
    date, 
    phoneNumber, 
    status 
  } = params;

  const localCount = await db.users.count();

  if (localCount === 0 || !hasFetchedInMemory) {
    const allUsers = await fetchUsers(); 

    await db.transaction('rw', db.users, async () => {
      await db.users.clear();
      await db.users.bulkAdd(allUsers);
    });

    hasFetchedInMemory = true;
  }

  let collection = db.users.toCollection();

  const hasFilters = organization || username || email || date || phoneNumber || status;

  if (hasFilters) {
    collection = db.users.filter((user) => {
      const matchOrg = !organization || user.organization === organization;
      
      const matchUsername = !username || 
        user.profile.username.toLowerCase().includes(username.toLowerCase());
        
      const matchEmail = !email || 
        user.profile.email.toLowerCase().includes(email.toLowerCase());
        
      const matchPhone = !phoneNumber || 
        user.profile.phoneNumber.includes(phoneNumber);
        
      const matchStatus = !status || user.status === status;

      const storedDate = user.dateJoined ? new Date(user.dateJoined).toISOString().split('T')[0] : "";
      const matchDate = !date || storedDate === date;

      return matchOrg && matchUsername && matchEmail && matchPhone && matchStatus && matchDate;
    });
  }

  const total = await collection.count();
  const startIndex = (page - 1) * limit;
  
  // Sort by ID numerically to ensure correct ordering
  const paginatedUsers = await collection
    .sortBy('id')
    .then(sorted => {
      // Sort numerically if IDs are numeric strings
      sorted.sort((a, b) => {
        const numA = parseInt(a.id);
        const numB = parseInt(b.id);
        return numA - numB;
      });
      return sorted.slice(startIndex, startIndex + limit);
    }) as UserDetails[];

  return {
    data: paginatedUsers, 
    total,
  };
};

export const getUserById = async (id: string): Promise<UserDetails | null> => {
  const user = await db.users.get(id) as UserDetails | undefined;
  return user || null;
};