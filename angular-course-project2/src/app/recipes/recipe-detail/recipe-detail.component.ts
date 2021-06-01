import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';
import { ShoppingService } from 'src/app/shopping/services/shopping.service';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(
    private shoppingService: ShoppingService,
    private recipseService: RecipeService,
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {    
    console.log("init recipe detail !")

    //const id = this.route.snapshot.params['id'];
    //this.recipe = this.recipseService.getRecipes[id];
    this.route.params.subscribe(
      (params: Params) => {        
        const id = +params['id'];
        console.log("RECIPE DETAIL ROUTE CHANGED : " + id)
        this.recipe = this.recipseService.getRecipe(id);
      }
    );
  }

  addIngredientsToShoppingList() {
    this.shoppingService.addIngredients(this.recipe.ingredients);
  }


}
