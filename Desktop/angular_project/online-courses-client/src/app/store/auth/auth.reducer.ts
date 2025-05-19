import { createReducer, on } from '@ngrx/store';
import { initialAuthState, AuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true
  })),
  on(AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false
  }))
);

export function reducer(state: AuthState | undefined, action: any) {
  return authReducer(state, action);
}