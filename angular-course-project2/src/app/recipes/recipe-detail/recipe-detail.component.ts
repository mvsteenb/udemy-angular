import { Component, Input, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/shopping/services/shopping.service';
import { Recipe } from '../model/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }

  addIngredientsToShoppingList() {
    this.shoppingService.addIngredients(this.recipe.ingredients);
  }


}
