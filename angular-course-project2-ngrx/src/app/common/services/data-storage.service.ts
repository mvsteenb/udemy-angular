import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "src/app/recipes/model/recipe.model";

import { map, tap } from 'rxjs/operators';
import { Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../../recipes/store/recipes.actions';

const requestUrl = 'https://ng-course-recipe-book-8ace1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {

  }

  storeRecipes() {
    console.log("Saving recipes...")
    const recipes = null; // TODO FIX THIS !!! this.recipeService.getRecipes();
    //this.store.select('recipes').
    this.http.put(requestUrl, recipes).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  fetchRecipes() {
    return this.http
    .get<Recipe[]>(requestUrl)
    .pipe(
      map( 
        recipes => {
          return recipes? recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
          }
        ) : null;
      }),
      tap(
        recipes => {
          //this.recipeService.setRecipes(recipes);
          this.store.dispatch(new RecipesActions.SetRecipes(recipes));
        }
      )
    );
  }

}