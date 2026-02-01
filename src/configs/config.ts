
const getEnv = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    console.warn(`Missing environment variable: ${key}`);
  }
  return value;
};

export const ENV = {
  MOCKAROO_URL: getEnv('VITE_MOCKAROO_API_URL'),
  MOCKAROO_API_KEY: getEnv('VITE_MOCKAROO_API_KEY'),
  TIMEOUT: 10_000,
} as const;