import { Component, OnInit } from "@angular/core";
import { Recipe } from "../model/recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  'styleUrls': ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  
  recipes: Recipe[] = [
    new Recipe('Ricechicken', 'Rice & chicken', 'https://www.simplyrecipes.com/thmb/Mrdls0tDdLyQ-cWAKPyOSpMXuds=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Chilaquiles-LEAD-1-be30b6674d3b43288bebc87e5eca1bec.jpg'),
    new Recipe('Ricechicken', 'Rice & chicken', 'https://www.simplyrecipes.com/thmb/Mrdls0tDdLyQ-cWAKPyOSpMXuds=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Chilaquiles-LEAD-1-be30b6674d3b43288bebc87e5eca1bec.jpg')
  ];

  ngOnInit() {

  }
}