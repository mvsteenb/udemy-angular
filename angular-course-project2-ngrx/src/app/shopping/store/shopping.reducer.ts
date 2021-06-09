import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/common/model/ingredient.model";
import * as ShoppingActions from "./shopping.actions";

const initialState = {
  ingredients: [
    new Ingredient('Applies', 5),
    new Ingredient('Tomatoes', 5)
  ]
}

export function shoppingReducer(
  state = initialState,                     // set state to initialState by default !
  action: ShoppingActions.AddIngredient
) {  
  switch (action.type) {
    case ShoppingActions.ADD_INGREDIENT : 
      return {
        ...state,
        ingredients: [
          ...state.ingredients, 
          action.payload
        ]
      };
    default: 
      return state;
  }
}