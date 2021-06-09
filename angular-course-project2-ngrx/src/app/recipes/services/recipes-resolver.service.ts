import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "src/app/common/services/data-storage.service";
import { Recipe } from "../model/recipe.model";
import { RecipeService } from "./recipes.service";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private recipesService : RecipeService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    }
    else {
      return recipes;
    }
  }

}