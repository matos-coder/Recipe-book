import {  Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list/shoppinglist.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected=new Subject<Recipe>();

  recipesChanged = new Subject<Recipe[]>();
  public recipes: Recipe[] = [];


  // recipes: Recipe[] =[
  //   new Recipe('test','also a test','https://www.foodandwine.com/thmb/YlgBj_G9a_psYSzA3gfU6gx9A3w=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/bucatini-with-mushroom-ragu-dandelion-greens-and-tarragon-FT-RECIPE0421-3a5f0d29f7264f5e9952d4a3a51f5f58.jpg',
  //   [
  //     new Ingredient('Buns', 2),
  //     new Ingredient('Meat', 1)
  //   ]),
  //   new Recipe('test','also a test',
  //   'https://www.foodandwine.com/thmb/YlgBj_G9a_psYSzA3gfU6gx9A3w=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/bucatini-with-mushroom-ragu-dandelion-greens-and-tarragon-FT-RECIPE0421-3a5f0d29f7264f5e9952d4a3a51f5f58.jpg',
  //   [
  //     new Ingredient('Meat', 1),
  //     new Ingredient('French Fries', 20)
  //   ])
  // ];
  constructor(private shopService: ShoppinglistService) { }
  getRecipe(){
    return this.recipes;
  }
  getRecipes(index: number){
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shopService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
  }
  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
  }
  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
  }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

}
