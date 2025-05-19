export interface AuthState {
    user: { id: number | null; role: string | null } | null;
    isAuthenticated: boolean;
  }
  
  export const initialAuthState: AuthState = {
    user: null,
    isAuthenticated: false
  };