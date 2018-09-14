import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipesService } from '../../../services/recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  
  recipe: Recipe;

  constructor(private recipeService:RecipesService, private route:ActivatedRoute) {}

  ngOnInit() {
    let index:number = +this.route.snapshot.params['index'];
    this.recipe = this.recipeService.getRecipe(index);
  }

}
