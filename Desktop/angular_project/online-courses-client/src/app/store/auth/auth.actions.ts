import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ user: { id: number; role: string } }>()
);

export const registerSuccess = createAction(
  '[Auth/API] Register Success',
  props<{ user: { id: number; role: string } }>()
);

export const logout = createAction(
  '[Auth/API] Logout'
);