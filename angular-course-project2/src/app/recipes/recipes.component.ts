import { Component, OnInit } from '@angular/core';
import { Recipe } from './model/recipe.model';
import { RecipeService } from './services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  selectedRecipe: Recipe;

  constructor(
    private recipeService : RecipeService
  ) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        console.log("selected recipe : " + recipe);
        this.selectedRecipe = recipe;
      }
    ); 
  }

}
