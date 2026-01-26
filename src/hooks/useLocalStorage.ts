import { useState } from "react";
import type{ UserDetails } from "../features/users/users.types";
import {getUserById} from "../features/users/users.service";

export const useUserDetails = () => {
  // Initialize state by checking local storage first
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(() => {
    const saved = localStorage.getItem("selectedUserSummary");
    return saved ? JSON.parse(saved) : null;
  });

  const saveUserDetails = async (user: UserDetails) => {
    const UserDetails = await getUserById(user.id);
    localStorage.setItem("selectedUserSummary", JSON.stringify(UserDetails));
    setSelectedUser(user);
  };

  const clearUserDetails = () => {
    localStorage.removeItem("selectedUserSummary");
    setSelectedUser(null);
  };

  const getSavedDetails = () => {
    const saved = localStorage.getItem("selectedUserSummary");
    return saved ? JSON.parse(saved) : null;
  };

  return { 
    selectedUser, 
    saveUserDetails, 
    clearUserDetails, 
    getSavedDetails 
  };
};