import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/common/model/ingredient.model";
import * as ShoppingActions from "./shopping.actions";

export interface State {
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIndex : number
}

const initialState: State = {
  ingredients: [
    new Ingredient('Applies', 5),
    new Ingredient('Tomatoes', 5)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

export function shoppingReducer(
  state = initialState,                     // set state to initialState by default !
  action: ShoppingActions.ShoppingListActions
) {  
  switch (action.type) {
    case ShoppingActions.ADD_INGREDIENT : 
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingActions.ADD_INGREDIENTS : 
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingActions.UPDATE_INGREDIENTS : 
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient, 
        ...action.payload
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };    
    case ShoppingActions.DELETE_INGREDIENT : 
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ig, index) => {
            return index != state.editedIngredientIndex;
          }
        )
      };
    case ShoppingActions.START_EDIT : 
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {...state.ingredients[action.payload]} // creates copy of ingredient object
      };
    case ShoppingActions.STOP_EDIT : 
      return {
        ...state, 
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default: 
      return state;
  }
}