import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../services/recipes.service';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  id : number;
  recipe: Recipe;

  constructor(
    private recipseService: RecipeService,
    private route : ActivatedRoute,
    private router : Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {    
    console.log("init recipe detail !")

    //const id = this.route.snapshot.params['id'];
    //this.recipe = this.recipseService.getRecipes[id];
    this.route.params.pipe(
      map(params => {
        return +params['id']
      }),
      switchMap(
        id => {
          this.id = id;
          return this.store.select('recipes');
        }
      ),
      map(recipesState => {
        return recipesState.recipes.find(
          (recipe, index) => {
            return index === this.id;
          }
        );
      })    
    )
    .subscribe(
      (recipe) => {
        this.recipe = recipe;
      }
    );
  }

  addIngredientsToShoppingList() {
    //this.shoppingService.addIngredients(this.recipe.ingredients);
    this.recipseService.addIngredientsToShoppingList(this.recipe.ingredients);
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
