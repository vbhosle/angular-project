import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.component';
import { RecipesService } from '../../../services/recipes.service';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  private recipes: Recipe[];

  constructor(private recipeService: RecipesService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getAllRecipes();
  }

}
