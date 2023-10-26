import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from './shoppinglist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[]=[
    new Ingredient('shenkurk',120),
    new Ingredient('muz',50)
  ];
  private igChange: Subscription;
  constructor(private shoplist: ShoppinglistService){}

  ngOnInit(){
    this.ingredients = this.shoplist.getIngridient();
    this.igChange = this.shoplist.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = this.ingredients;
        }
      )
  }
  ngOnDestroy(): void {
    this.igChange.unsubscribe();
  }
}
