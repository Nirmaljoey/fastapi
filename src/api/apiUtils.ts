// Error handler
import axios from 'axios';
import { BaseApiResponse } from './types';

// Handle API errors uniformly
export const handleApiError = (error: unknown, defaultMessage: string): Error => {
  if (axios.isAxiosError(error)) {
    const serverError = error.response?.data as BaseApiResponse;
    return new Error(serverError?.error || defaultMessage);
  }
  return error instanceof Error ? error : new Error(defaultMessage);
};
