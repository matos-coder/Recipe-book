import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

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
    private router: ActivatedRoute){

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
    console.log(this.recipeForm);
  }
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
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
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipename),
      'imagePath': new FormControl(recipeimagepath),
      'description': new FormControl(recipedescription),
      'ingredients': recipeingredients
    });
  }

}
