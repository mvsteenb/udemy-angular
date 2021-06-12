import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../model/recipe.model";
import * as RecipesActions from "../store/recipes.actions";
import * as fromApp from '../../store/app.reducer';

const requestUrl = 'https://ng-course-recipe-book-8ace1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

@Injectable()
export class RecipeEffects {
 
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(
      () => {
        console.log("Getting recipes...");
        return this.http.get<Recipe[]>(requestUrl) 
      }
    ),
    map( 
      recipes => {
        
        return recipes? recipes.map(recipe => {
          return {
            ...recipe, 
            ingredients: recipe.ingredients ? recipe.ingredients : []
          }
        }
      ) : null;
    }),
    map(
      recipes => {
        return new RecipesActions.SetRecipes(recipes)
      }
    )
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(
      ([actionData, recipesState]) => {
        console.log("Storing recipes...");
        return this.http.put(requestUrl, recipesState.recipes);
      }
    )
  )

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}

} 