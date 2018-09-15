import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipesService } from '../../../services/recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from '../../../services/shopping-list.service';

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  index: number;
  recipe: Recipe;

  constructor(
              private recipeService: RecipesService, 
              private shoppingListService: ShoppingListService,
              private route: ActivatedRoute, 
              private router: Router
              ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params['index'];
        this.recipe = this.recipeService.getRecipe(this.index);
      }
    );

  }

  onDelete() {
    this.recipeService.removeRecipe(this.index);
    this.router.navigate(['/recipes']);
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  toShoppingList(){
    this.shoppingListService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
