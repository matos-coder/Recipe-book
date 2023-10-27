import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppinglistService } from '../shoppinglist.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription:Subscription;
  editmode=false;
  edititemindex: number;
  editedItem: Ingredient;
  constructor(private shopService:ShoppinglistService){

  }
  ngOnInit() {
    this.subscription = this.shopService.startedit
      .subscribe(
        (index: number) => {
          this.edititemindex = index;
          this.editmode = true;
          this.editedItem = this.shopService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }
  onAddItem(form: NgForm){
    const value = form.value;
    console.log(value);
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editmode){
      this.shopService.updateIngredient(this.edititemindex, newIngredient)
    } else{
      console.log(value);
      this.shopService.addIngredient(newIngredient);
    }
    this.editmode= false;
    form.reset();

  }
  onclear(){
    this.slForm.reset();
    this.editmode = false;
  }
  ondelete(){

    this.shopService.deleteIngredient(this.edititemindex);
    this.onclear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
