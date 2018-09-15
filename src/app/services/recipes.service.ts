import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  recipeUpdates: Subject<Recipe[]>= new Subject<Recipe[]>();
  private recipes: Recipe[];

  constructor() {
    this.recipes = [
      {
        title: 'Matar Paneer',
        description: 'Mattar paneer is a vegetarian north Indian dish consisting of peas and paneer in a tomato based sauce, spiced with garam masala.',
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Matar-Paneer.JPG/640px-Matar-Paneer.JPG',
        ingredients: [
          { name: 'green pea', amount: 2 },
          { name: 'paneer', amount: 5 }
        ]
      },
      {
        title: 'Pav Bhaji',
        description: 'Pav bhaji is a fast food dish from India, consisting of a thick vegetable curry, fried and served with a soft bread roll.',
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Pav_bhaji_from_Mumbai.JPG/640px-Pav_bhaji_from_Mumbai.JPG',
        ingredients: [
          { name: 'mix vegetables', amount: 4 },
          { name: 'potatos', amount: 4 },
          { name: 'onions', amount: 4 }
        ]
      },
      {
        title: 'Ukadiche Modak',
        description: ' The sweet filling on the inside of a modak consists of freshly grated coconut and jaggery while the outer soft shell is made from rice flour or wheat flour mixed with khava or maida flour.',
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Puneri_Ukadiche_Modak.jpg/640px-Puneri_Ukadiche_Modak.jpg',
        ingredients: [
          { name: 'Jaggery', amount: 1 },
          { name: 'Fresh coconut', amount: 1 },
          { name: 'rice flour', amount: 1 }
        ]
      }
    ];
  }

  getAllRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe) {
    console.log('recipes.length: before ' + this.recipes.length)
    this.recipes.push(recipe);
    console.log('recipes.length: after ' + this.recipes.length)
    this.recipeUpdates.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    console.log('updateRecipe');
    console.log(recipe);
    if (this.isValidIndex(index)) {
      this.recipes[index] = recipe;
      this.recipeUpdates.next(this.recipes.slice());
    }
  }

  getRecipe(index: number) {
    if (!this.isValidIndex(index)) {
      return null;
    }
    return this.recipes[index];
    
  }

  removeRecipe(index: number) {
    if (this.isValidIndex(index)) {
      this.recipes.splice(index, 1);
      this.recipeUpdates.next(this.recipes.slice());
    }
  }

  isValidIndex(index: number): boolean {
    return !(isNaN(index) || index >= this.recipes.length || index < 0);
  }
}
