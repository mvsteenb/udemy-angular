import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { Recipe } from "../model/recipe.model";
import * as RecipesActions from "../store/recipes.actions";

const requestUrl = 'https://ng-course-recipe-book-8ace1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

@Injectable()
export class RecipeEffects {
 
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(
      () => {
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

  constructor(private actions$: Actions, private http: HttpClient) {}

} 