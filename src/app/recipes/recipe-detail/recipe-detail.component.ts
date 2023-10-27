import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipe:Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
    private routes: ActivatedRoute,
    private router: Router){

    }
  ngOnInit(){
    this.routes.params
      .subscribe(
        (params: Params)=>{
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipes(this.id);
        }
      );
  }
  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.routes});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

}
