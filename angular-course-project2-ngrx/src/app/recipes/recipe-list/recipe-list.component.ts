import { Component, OnDestroy, OnInit, } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Recipe } from "../model/recipe.model";

import * as fromStore from "../../store/app.reducer";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

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
    private router : Router,
    private route: ActivatedRoute,
    private store: Store<fromStore.AppState>
  ) {}

  ngOnInit() {    
    this.recipeChangeSubscription = this.store
      .select('recipes')
      .pipe(map(recipesState => recipesState.recipes))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
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