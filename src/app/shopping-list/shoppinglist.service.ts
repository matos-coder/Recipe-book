import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {

  ingredientsChanged = new Subject<Ingredient[]>;
  startedit= new Subject<number>();
  private ingredients: Ingredient[]=[
    new Ingredient('shenkurk',120),
    new Ingredient('muz',50),
  ];


  getIngridients(){
    return this.ingredients;
  }
  getIngredient(index: number){
    return this.ingredients[index];
  }
  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    //this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    //this.ingredientsChanged.next(this.ingredients.slice());
  }
  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    //this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    //this.ingredientsChanged.next(this.ingredients.slice());
  }

}
