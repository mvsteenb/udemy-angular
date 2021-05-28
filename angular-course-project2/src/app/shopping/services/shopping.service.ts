import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "src/app/common/model/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredientsChangedEventEmitter = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Applies', 5),
    new Ingredient('Tomatoes', 5)
  ];

  /**
   * Returns all ingredients
   * @returns all ingredients
   */

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  /**
   * Adds ingredient to list
   * @param ingredient ingredient
   */

  addIngredient(ingredient : Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChangedEventEmitter.emit(this.getIngredients());
  }

  /**
   * Add multiple ingredients at once to shopping list
   * @param ingredients ingredients
   */

  addIngredients(ingredients : Ingredient[]) {
    this.ingredients.push(...ingredients);
    console.log("Added multiple ingredients to shopping list : " + this.ingredients.length);
    this.ingredientsChangedEventEmitter.emit(this.getIngredients());
  }

}