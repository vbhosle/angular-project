import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private recipes: Recipe[];

  constructor() {
    this.recipes = [
      {
        title: 'Matar Paneer',
        description: 'Mattar paneer is a vegetarian north Indian dish consisting of peas and paneer in a tomato based sauce, spiced with garam masala.',
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Matar-Paneer.JPG/640px-Matar-Paneer.JPG',
        ingredients: [
          { name: 'green pea', amount: 2 },
          { name: 'paneer', amount: 5}
        ]
      },
      {
        title: 'Butter Chicken',
        description: 'desc',
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Chicken_makhani.jpg/640px-Chicken_makhani.jpg',
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

  getRecipe(index: number){
    console.log('get'+index);
    return this.recipes[index];
  }

  removeRecipe(index: number){
    this.recipes.splice(index,1);
  }
}
