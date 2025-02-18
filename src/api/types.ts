// Base Response
export interface BaseApiResponse {
    success: boolean;
    status: number;
    error: string | null;
  }
  
  // User Types
  export interface UserRegistrationData {
    email: string;
    password: string;
    first_name: string;
    middle_name?: string;
    last_name?: string;
    phone: string;
  }
  
  export interface UserResponseData {
    id: number;
    email: string;
    first_name: string;
    middle_name: string | null;
    last_name: string | null;
    phone: string;
    is_email_confirmed: boolean;
    is_phone_number_confirmed: boolean;
    created_at: string;
    updated_at: string;
  }
  
  // Auth Types
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface AuthTokens {
    access_token: string;
    refresh_token: string;
  }
  
  export interface VerificationResponseData {
    email: string;
    is_verified: boolean;
  }