import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from 'src/app/logging.service';
import { Ingredient } from '../../common/model/ingredient.model';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ingredients: Ingredient[]}>;
  //private idChangeSub: Subscription;

  constructor(
    private shoppingService : ShoppingService, 
    private loggingService: LoggingService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    //this.ingredients = this.shoppingService.getIngredients();
    /*this.idChangeSub = this.shoppingService.ingredientsChangedEventEmitter.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );*/
    
    this.loggingService.printLog("Hello from shopping-list-component");
  }

  onEditItem(index: number) {
    this.shoppingService.startedEditing.next(index);
  }

  ngOnDestroy() {
    //this.idChangeSub.unsubscribe();
  }

  /*addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }*/

}
