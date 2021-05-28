import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Recipe } from "../model/recipe.model";
import { RecipeService } from "../services/recipes.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  'styleUrls': ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  
  recipes: Recipe[];
  //@Output('onRecipeSelected') recipeSelectedEventEmitter = new EventEmitter<Recipe>();

  constructor(private recipeService : RecipeService) {}

  ngOnInit() {
     this.recipes = this.recipeService.getRecipes();
  }

  /*setSelectedRecipe(recipe: Recipe) {
    //this.recipeSelectedEventEmitter.emit(recipe);
  }*/
}