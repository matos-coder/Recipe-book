import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {
  ingredientsChanged = new Subject<Ingredient[]>;
  private ingredients: Ingredient[]=[
    new Ingredient('shenkurk',120),
    new Ingredient('muz',50)
  ];

  getIngridient(){
    return this.ingredients.slice();
  }
  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  constructor() { }
}
