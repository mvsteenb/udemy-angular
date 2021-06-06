import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "src/app/recipes/model/recipe.model";
import { RecipeService } from "src/app/recipes/services/recipes.service";

import { map } from 'rxjs/operators';

const requestUrl = 'https://ng-course-recipe-book-8ace1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) {

  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(requestUrl, recipes).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  fetchRecipes() {
    this.http
    .get<Recipe[]>(requestUrl)
    .pipe(map( recipes => {
      return recipes? recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
      }) : null;
    }))
    .subscribe(
      recipes => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      }
    );
  }

}