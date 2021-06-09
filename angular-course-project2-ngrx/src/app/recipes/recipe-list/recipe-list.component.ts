import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Recipe } from "../model/recipe.model";
import { RecipeService } from "../services/recipes.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  'styleUrls': ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  
  recipes: Recipe[];
  //@Output('onRecipeSelected') recipeSelectedEventEmitter = new EventEmitter<Recipe>();
  recipeChangeSubscription: Subscription;

  constructor(
    private recipeService : RecipeService,
    private router : Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
     this.recipes = this.recipeService.getRecipes();
     this.recipeChangeSubscription = this.recipeService.recipeChangedEmitter.subscribe(
       (recipes: Recipe[]) => {
        this.recipes = recipes;
       }
     );
  }

  setSelectedRecipe(recipe: Recipe) {
    //this.recipeSelectedEventEmitter.emit(recipe);
  }

  onNewRecipe() {
    this.router.navigate(["new"], {relativeTo: this.route} );
  }

  ngOnDestroy() {
    this.recipeChangeSubscription.unsubscribe();
  }
}