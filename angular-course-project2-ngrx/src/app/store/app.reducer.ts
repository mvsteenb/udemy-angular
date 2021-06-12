import * as fromShoppingList from '../shopping/store/shopping.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipes.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  auth : fromAuth.State;
  shoppingList : fromShoppingList.State;
  recipes : fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  shoppingList: fromShoppingList.shoppingReducer,
  recipes: fromRecipes.recipeReducer
}