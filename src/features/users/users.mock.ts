import axios, { AxiosError } from 'axios';
import type { UserDetails } from "./users.types";
import { ENV } from '../../configs/env';

const MOCKAROO_URL = `${ENV.MOCKAROO_URL}?key=${ENV.MOCKAROO_API_KEY}`;


/**
 * Fetches 500 users from the Mockaroo endpoint.
 */
export const fetchUsers = async (): Promise<UserDetails[]> => {
  try {
    const response = await axios.get<UserDetails[]>(MOCKAROO_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      if (axiosError.response) {
        console.error(`Failed to fetch users: ${axiosError.response.status} - ${axiosError.response.statusText}`);
        throw new Error(`Failed to fetch users: ${axiosError.response.statusText}`);
      } else if (axiosError.request) {
        console.error('No response from server:', axiosError.request);
        throw new Error('Network error: Unable to reach the server');
      } else {
        console.error('Error setting up request:', axiosError.message);
        throw new Error(`Request error: ${axiosError.message}`);
      }
    }
    if (error instanceof Error) {
      console.error('Unexpected error:', error.message);
      throw new Error(`Unexpected error: ${error.message}`);
    }
    console.error('Unknown error occurred:', error);
    throw new Error('An unknown error occurred while fetching users');
  }
};