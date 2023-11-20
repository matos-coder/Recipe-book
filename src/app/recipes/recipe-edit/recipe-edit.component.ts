import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute,
    private recipeservice: RecipeService,
    private router: Router){

  }
  ngOnInit(){
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] !=null;
          this.initForm();
        }
      );
  }
  onSubmit(){

    if(this.editMode){
      this.recipeservice.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeservice.addRecipe(this.recipeForm.value);
    }
    this.oncancel();
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup({
          'name': new FormControl(null, Validators.required),
          'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        })
    );
  }
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  oncancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  private initForm(){
    let recipename = '';
    let recipeimagepath = '';
    let recipedescription = '';
    let recipeingredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeservice.getRecipes(this.id);
      recipename = recipe.name;
      recipedescription = recipe.description;
      recipeimagepath = recipe.imagePath;
      if ( recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeingredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipename, Validators.required),
      'imagePath': new FormControl(recipeimagepath, Validators.required),
      'description': new FormControl(recipedescription, Validators.required),
      'ingredients': recipeingredients
    });
  }


}
