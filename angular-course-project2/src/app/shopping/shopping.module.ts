import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";
import { IngredientComponent } from "./ingredient/ingredient.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

@NgModule({
  declarations: [
    ShoppingListComponent,
    IngredientComponent,
    ShoppingEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule    
  ],
})
export class ShoppingModule {

}