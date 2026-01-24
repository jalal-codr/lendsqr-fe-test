export interface LoginPayload {
  email: string;
  password: string;
}

const AUTH_KEY = "lendsqr_auth";

export const login = async ({ email, password }: LoginPayload) => {
  // fake delay to simulate API
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!email || !password) {
    throw new Error("Invalid credentials");
  }

  const user = {
    email,
    token: "mock-jwt-token",
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const getAuthUser = () => {
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
};