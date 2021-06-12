import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { DataStorageService } from "src/app/common/services/data-storage.service";
import { Recipe } from "../model/recipe.model";
import { RecipeService } from "./recipes.service";
import * as fromApp from "../../store/app.reducer";
import * as RecipeActions from "../store/recipes.actions";
import { Actions, ofType } from "@ngrx/effects";
import { take, tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(
    private dataStorageService: DataStorageService, 
    private recipesService : RecipeService,
    private store: Store<fromApp.AppState>,
    private actions$ : Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("resolving recipe...");
    this.store.dispatch(new RecipeActions.FetchRecipes());
    return this.actions$.pipe(
      ofType(RecipeActions.SET_RECIPES),
      take(1)
    );

  }

}