import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from './shoppinglist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[];
  private subscription: Subscription;
  constructor(private shoplist: ShoppinglistService){}

  ngOnInit(){
    this.ingredients = this.shoplist.getIngridient();
    this.subscription = this.shoplist.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      )
  }
  onEditItem(index: number){
    this.shoplist.startedit.next(index);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
