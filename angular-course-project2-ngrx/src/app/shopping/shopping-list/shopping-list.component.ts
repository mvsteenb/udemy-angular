import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from 'src/app/logging.service';
import { Ingredient } from '../../common/model/ingredient.model';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from '../store/shopping.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ingredients: Ingredient[]}>;
  //private idChangeSub: Subscription;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>
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
    //this.shoppingService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {
    //this.idChangeSub.unsubscribe();
  }

  /*addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }*/

}
