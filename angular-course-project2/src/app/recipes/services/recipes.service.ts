import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../model/recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();
  
  private recipes: Recipe[] = [
    new Recipe('Ricechicken', 'Rice & chicken', 'https://www.simplyrecipes.com/thmb/Mrdls0tDdLyQ-cWAKPyOSpMXuds=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Chilaquiles-LEAD-1-be30b6674d3b43288bebc87e5eca1bec.jpg'),
    new Recipe('Spaghetti', 'Spaghetti Bolognese', 'https://static.ah.nl/static/recepten/img_004328_1600x_JPG.jpg')
  ];

  getRecipes() {
    return this.recipes.slice(); // makes copy of array !
  }

}