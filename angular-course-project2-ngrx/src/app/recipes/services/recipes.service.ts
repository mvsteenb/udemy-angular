import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "src/app/common/model/ingredient.model";
import { Recipe } from "../model/recipe.model";
import * as ShoppingListActions from "src/app/shopping/store/shopping.actions";
import * as fromApp from "../../store/app.reducer";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new Subject<Recipe>();
  recipeChangedEmitter = new Subject<Recipe[]>();
 
  constructor(private store: Store<fromApp.AppState> ) {}

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Ricechicken', 
  //     'Rice & chicken', 
  //     'https://www.simplyrecipes.com/thmb/Mrdls0tDdLyQ-cWAKPyOSpMXuds=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Chilaquiles-LEAD-1-be30b6674d3b43288bebc87e5eca1bec.jpg',
  //     [
  //       new Ingredient('Chicken', 100),
  //       new Ingredient('Rice', 60),
  //     ]
  //   ),
  //   new Recipe(
  //     'Spaghetti', 
  //     'Spaghetti Bolognese', 'https://static.ah.nl/static/recepten/img_004328_1600x_JPG.jpg',
  //     [
  //       new Ingredient('Pasta', 80),
  //       new Ingredient('Tomatoe sauce', 150),
  //     ]
  //   )
  // ];

  private recipes : Recipe[] = [];

  getRecipes() {
    return this.recipes.slice(); // makes copy of array !
  }

  getRecipe(id: number) : Recipe {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChangedEmitter.next(this.recipes.slice());
  }

  updateRecipe(index : number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChangedEmitter.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChangedEmitter.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes ? recipes : [];    
    this.recipeChangedEmitter.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

}