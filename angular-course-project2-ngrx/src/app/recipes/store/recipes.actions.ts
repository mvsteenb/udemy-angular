import { Action } from "@ngrx/store";
import { Recipe } from "../model/recipe.model";

// ************ action constants ****************

export const SET_RECIPES = '[Recipes] Set Recipes';

// ************** action classes ****************

export class SetRecipes implements Action {
  readonly type= SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

// ************** union ****************

export type RecipesActions = SetRecipes;