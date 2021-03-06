import { EventEmitter, Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { Ingredient } from "src/app/common/model/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredientsChangedEventEmitter = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private idChangeSub: Subscription;

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

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientsChangedEventEmitter.next(this.ingredients.slice())
  }

  deleteIngredient(index : number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChangedEventEmitter.next(this.ingredients.slice())
  }

  /**
   * Adds ingredient to list
   * @param ingredient ingredient
   */

  addIngredient(ingredient : Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChangedEventEmitter.next(this.getIngredients());
  }

  /**
   * Add multiple ingredients at once to shopping list
   * @param ingredients ingredients
   */

  addIngredients(ingredients : Ingredient[]) {
    this.ingredients.push(...ingredients);
    console.log("Added multiple ingredients to shopping list : " + this.ingredients.length);
    this.ingredientsChangedEventEmitter.next(this.getIngredients());
  }

}