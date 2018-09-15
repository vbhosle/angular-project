import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../../../models/recipe.model';
import { RecipesService } from '../../../services/recipes.service';
import { Ingredient } from '../../../models/ingredient.model';

@Component({
  selector: 'recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {

  index: number;
  recipeForm: FormGroup;

  constructor(private recipeService: RecipesService, private route: ActivatedRoute, private router: Router) { }

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
        let title: string ='', description: string ='', imageURL: string='', ingredients: Ingredient[]=[];
        this.index = +params['index'];
        let recipe:Recipe = this.recipeService.getRecipe(this.index);

        //if recipe found override defaults
        if(recipe){
          title = recipe.title;
          description = recipe.description;
          imageURL = recipe.imageURL;
          ingredients = recipe.ingredients;
        }
        else{
          this.index = NaN;
        }

        this.recipeForm.setValue({
          'title': title,
          'description': description,
          'imageURL': imageURL,
          'ingredients': []
        });

        ingredients.forEach(
          (ingredient: Ingredient) =>{
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
    if(isNaN(this.index)){
      //new recipe - add
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    else{
      //existing recipe - edit
      this.recipeService.updateRecipe(this.index, this.recipeForm.value);
    }

    this.router.navigate(['/recipes']);
  }

  createIngredientFormGroup(){
    return new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required,Validators.min(1)])
    });
  }

  onAddIngredient() {
    const ingredient:FormGroup = this.createIngredientFormGroup();
    
    (<FormArray>this.recipeForm.get('ingredients')).insert(0,ingredient);
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['..'], {relativeTo: this.route});
  }
}
