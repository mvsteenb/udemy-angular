import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { ShoppingService } from 'src/app/shopping/services/shopping.service';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  id : number;
  recipe: Recipe;

  constructor(
    private shoppingService: ShoppingService,
    private recipseService: RecipeService,
    private route : ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit(): void {    
    console.log("init recipe detail !")

    //const id = this.route.snapshot.params['id'];
    //this.recipe = this.recipseService.getRecipes[id];
    this.route.params.subscribe(
      (params: Params) => {        
        this.id = +params['id'];
        console.log("RECIPE DETAIL ROUTE CHANGED : " + this.id)
        this.recipe = this.recipseService.getRecipe(this.id);
      }
    );
  }

  addIngredientsToShoppingList() {
    this.shoppingService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // OR USE : this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    console.log("Delete recipe");
    this.recipseService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }
}
