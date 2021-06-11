import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/common/model/ingredient.model";

export const ADD_INGREDIENT    = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS   = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENTS   = 'UPDATE_INGREDIENTS';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = "START_EDIT";
export const STOP_EDIT = "STOP_EDIT";

export class StartEdit {
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}

export class StopEdit {
  readonly type = STOP_EDIT;
}

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENTS;
  constructor(public payload: {index: number, ingredient: Ingredient}) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
  constructor(public payload: number) {}
}

export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient | StartEdit | StopEdit;