import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from './model/recipe.model';
import { RecipeService } from './services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

  constructor(
    private recipeService : RecipeService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {

  }

}
