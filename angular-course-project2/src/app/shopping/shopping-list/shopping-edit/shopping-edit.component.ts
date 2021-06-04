import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/common/model/ingredient.model';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) form : NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemindex: number;
  editedItem: Ingredient;

  constructor(private shoppingService : ShoppingService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemindex = index;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.form.setValue({
          name: this.editedItem.name,
          amount : this.editedItem.amount
        });
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
      this.shoppingService.updateIngredient(this.editedItemindex, newIngredient);
    }
    else {
      this.shoppingService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.form.reset();    
  }

  resetValues() {
    this.editMode = false;
    this.form.reset();
  }

  onDelete() {
    if (this.editMode) {
      this.shoppingService.deleteIngredient(this.editedItemindex);
    }
    this.resetValues();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
