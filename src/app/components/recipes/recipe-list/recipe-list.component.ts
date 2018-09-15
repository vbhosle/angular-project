import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipesService } from '../../../services/recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  private recipes: Recipe[];
  private recipesSubscription: Subscription;
  constructor(private recipeService: RecipesService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getAllRecipes();
    this.recipesSubscription = this.recipeService.recipeUpdates.subscribe(
      (updatedRecipes: Recipe[]) => {
        this.recipes = updatedRecipes;
      }
    );
  }

  ngOnDestroy(){
    this.recipesSubscription.unsubscribe();
  }
}
