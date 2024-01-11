import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{
  selectedRecipe:Recipe;
  subscription: Subscription;

  constructor(
    //private recipeService: RecipeService
    ){

  }
  ngOnInit(){
    // this.recipeService.recipeSelected
    //   .subscribe(
    //     (recipe: Recipe) => {
    //       this.selectedRecipe= recipe;
    //     }
    //   )
  }
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }


}
