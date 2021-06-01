import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "src/app/common/model/ingredient.model";
import { Recipe } from "../model/recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();
  
  private recipes: Recipe[] = [
    new Recipe(
      'Ricechicken', 
      'Rice & chicken', 
      'https://www.simplyrecipes.com/thmb/Mrdls0tDdLyQ-cWAKPyOSpMXuds=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Chilaquiles-LEAD-1-be30b6674d3b43288bebc87e5eca1bec.jpg',
      [
        new Ingredient('Chicken', 100),
        new Ingredient('Rice', 60),
      ]
    ),
    new Recipe(
      'Spaghetti', 
      'Spaghetti Bolognese', 'https://static.ah.nl/static/recepten/img_004328_1600x_JPG.jpg',
      [
        new Ingredient('Pasta', 80),
        new Ingredient('Tomatoe sauce', 150),
      ]
    )
  ];

  getRecipes() {
    return this.recipes.slice(); // makes copy of array !
  }

  getRecipe(id: number) : Recipe {
    return this.recipes[id];
  }

}