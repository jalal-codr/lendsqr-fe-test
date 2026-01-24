import { useState } from "react";
import { login, logout, getAuthUser } from "../features/auth/auth.service";

export const useAuth = () => {
  const [user, setUser] = useState(getAuthUser());

  const signIn = async (email: string, password: string) => {
    const loggedInUser = await login({ email, password });
    setUser(loggedInUser);
  };

  const signOut = () => {
    logout();
    setUser(null);
  };

  return { user, signIn, signOut };
};