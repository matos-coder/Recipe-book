import { Component } from '@angular/core';
import { ShoppinglistService } from '../shoppinglist.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {



  constructor(private shopService:ShoppinglistService){

  }
  onAddItem(form: NgForm){
    const value= form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.shopService.addIngredient(newIngredient);
  }
}
