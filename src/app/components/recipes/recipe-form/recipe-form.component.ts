import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Recipe } from '../../../models/recipe.model';
import { Ingredient } from '../../../models/ingredient.model';

import { RecipesService } from '../../../services/recipes.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CanDeactivateGuard } from '../../../can-deactivate-guard.service';
import { timeout } from 'q';


@Component({
  selector: 'recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit, CanDeactivateGuard {

  index: number;
  recipeForm: FormGroup;

  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'imageURL': new FormControl(null, Validators.required),
      'ingredients': new FormArray([])
    });
    this.route.params.subscribe(
      (params: Params) => {
        //default values
        let title: string = '', description: string = '', imageURL: string = '', ingredients: Ingredient[] = [];
        this.index = +params['index'];
        let recipe: Recipe = this.recipeService.getRecipe(this.index);

        //if recipe found override defaults
        if (recipe) {
          title = recipe.title;
          description = recipe.description;
          imageURL = recipe.imageURL;
          ingredients = recipe.ingredients;
        }
        else {
          this.index = NaN;
        }

        this.recipeForm.setValue({
          'title': title,
          'description': description,
          'imageURL': imageURL,
          'ingredients': []
        });

        ingredients.forEach(
          (ingredient: Ingredient) => {
            let control: FormGroup = this.createIngredientFormGroup();
            control.setValue({
              'name': ingredient.name,
              'amount': ingredient.amount
            });
            (<FormArray>this.recipeForm.get('ingredients'))
              .push(control);
          }
        );
      }
    );


  }

  onSubmit() {
    if (isNaN(this.index)) {
      //new recipe - add
      this.recipeService.addRecipe(this.recipeForm.value);
      this.flashMessagesService.show(
        `<div class="alert alert-success">
            <strong><span class="label label-success">New</span> Recipe Added: </strong> ${this.recipeForm.get('title').value}
          </div>`
        , {cssClass: 'flash-message-custom', timeout: 2000, closeOnClick: true }
        );
    }
    else {
      //existing recipe - edit
      this.recipeService.updateRecipe(this.index, this.recipeForm.value);
      this.flashMessagesService.show(
        `<div class="alert alert-info">
            <strong><span class="glyphicon glyphicon-pencil"></span> Recipe updated: </strong> ${this.recipeForm.get('title').value}
          </div>`
        , {cssClass: 'flash-message-custom', timeout: 2000, closeOnClick: true }
        );
    }
    this.recipeForm.reset(this.recipeForm.value);
    this.router.navigate(['/recipes']);
  }

  createIngredientFormGroup() {
    return new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.min(1)])
    });
  }

  onAddIngredient() {
    const ingredient: FormGroup = this.createIngredientFormGroup();

    (<FormArray>this.recipeForm.get('ingredients')).insert(0, ingredient);
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    this.recipeForm.markAsTouched();
    this.recipeForm.markAsDirty();
  }

  onCancel() {
    console.log(this.recipeForm.get('ingredients'));
    this.router.navigate(['/recipes'], { relativeTo: this.route });
  }

  canDeactivate() {
    console.log('can deactivate');
    if (!this.recipeForm.pristine) {
      return confirm('Changes will be lost. Do you want to proceed without saving?');
    }
    return this.recipeForm.pristine;
  }
}
