import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.component';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private recipes: Recipe[];

  constructor() {
    this.recipes = [
      {
        title: 'Mutter Paneer',
        description: 'desc',
        imageURL: '',
        ingredients: [
          { name: 'Mutter', amount: 2 }
        ]
      },
      {
        title: 'Butter Chicken',
        description: 'desc',
        imageURL: '',
        ingredients: [
          { name: 'chicken', amount: 2 }
        ]
      }
    ];
  }

  getAllRecipes():Recipe[]{
    return this.recipes.slice();
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
  }

  removeRecipe(recipe:Recipe){
    this.recipes.splice(this.recipes.findIndex(
      (currentRecipe:Recipe) => {return recipe.title === currentRecipe.title}
    ),1);
  }
}
