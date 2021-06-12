import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { DataStorageService } from "src/app/common/services/data-storage.service";
import { Recipe } from "../model/recipe.model";
import { RecipeService } from "./recipes.service";
import * as fromApp from "../../store/app.reducer";
import * as RecipeActions from "../store/recipes.actions";
import { Actions, ofType } from "@ngrx/effects";
import { map, switchMap, take, tap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(
    private dataStorageService: DataStorageService, 
    private recipesService : RecipeService,
    private store: Store<fromApp.AppState>,
    private actions$ : Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipes').pipe(
      take(1),
      map(recipesState => { 
        return recipesState.recipes 
      }),
      switchMap(recipes => { 
        if (recipes.length === 0) {
          this.store.dispatch(new RecipeActions.FetchRecipes());
          return this.actions$.pipe(
            ofType(RecipeActions.SET_RECIPES),
            take(1)
          );
        }
        else {
          return of(recipes);
        }
      })
    )

  }

}