import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Recipe } from "../model/recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  'styleUrls': ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  
  recipes: Recipe[] = [
    new Recipe('Ricechicken', 'Rice & chicken', 'https://www.simplyrecipes.com/thmb/Mrdls0tDdLyQ-cWAKPyOSpMXuds=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Chilaquiles-LEAD-1-be30b6674d3b43288bebc87e5eca1bec.jpg'),
    new Recipe('Spaghetti', 'Spaghetti Bolognese', 'https://static.ah.nl/static/recepten/img_004328_1600x_JPG.jpg')
  ];

  @Output('onRecipeSelected') recipeSelectedEventEmitter = new EventEmitter<Recipe>();

  ngOnInit() {

  }

  setSelectedRecipe(recipe: Recipe) {
    this.recipeSelectedEventEmitter.emit(recipe);
  }
}