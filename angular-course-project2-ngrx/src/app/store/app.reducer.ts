import * as fromShoppingList from '../shopping/store/shopping.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList : fromShoppingList.State;
  auth : fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingReducer,
  auth: fromAuth.authReducer
}