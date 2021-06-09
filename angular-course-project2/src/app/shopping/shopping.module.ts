import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../common/shared.module";
import { IngredientComponent } from "./ingredient/ingredient.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingRoutingModule } from "./shopping-routing.module";

@NgModule({
  declarations: [
    ShoppingListComponent,
    IngredientComponent,
    ShoppingEditComponent,
  ],
  imports: [
    FormsModule,
    SharedModule,
    RouterModule,
    ShoppingRoutingModule
  ],
})
export class ShoppingModule {

}