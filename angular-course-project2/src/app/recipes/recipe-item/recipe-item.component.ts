import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private recipeService : RecipeService) { }

  ngOnInit(): void {
  }

  setSelectedRecipe(recipe: Recipe) {
    console.log("selected recipe: " + recipe.name);
    this.recipeService.recipeSelected.emit(recipe);
  }

}
