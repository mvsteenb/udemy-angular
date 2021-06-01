import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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

  constructor(
    private recipeService : RecipeService,
    private router : Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
     this.recipes = this.recipeService.getRecipes();
  }

  setSelectedRecipe(recipe: Recipe) {
    //this.recipeSelectedEventEmitter.emit(recipe);
  }

  onNewRecipe() {
    this.router.navigate(["new"], {relativeTo: this.route} );
  }
}