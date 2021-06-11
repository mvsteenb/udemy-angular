import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { State, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/common/model/ingredient.model';
import * as ShoppingListActions from "src/app/shopping/store/shopping.actions";
import * as fromApp from "../../../store/app.reducer";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) form : NgForm;

  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    /*this.subscription = this.shoppingService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemindex = index;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.form.setValue({
          name: this.editedItem.name,
          amount : this.editedItem.amount
        });
      }
    );*/
    this.subscription = this.store.select('shoppingList').subscribe(
      stateData => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.form.setValue({
            name: this.editedItem.name,
            amount : this.editedItem.amount
          });
        }
        else {
          this.editMode = false;
        }
      }
    );
  }

  addIngredient() {
    /*this.ingredientAddedEventEmitter.emit(
      new Ingredient(
        this.nameInput.nativeElement.value,
        this.amountInput.nativeElement.value
      )
    );*/
    /*this.shoppingService.addIngredient(
      new Ingredient(
        this.nameInput.nativeElement.value,
        this.amountInput.nativeElement.value
      )
    );*/
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      //this.shoppingService.updateIngredient(this.editedItemindex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    }
    else {
      //this.shoppingService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    this.form.reset();    
  }

  resetValues() {
    this.editMode = false;
    this.form.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    if (this.editMode) {
      //this.shoppingService.deleteIngredient(this.editedItemindex);
      this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    }
    this.resetValues();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
