import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ShoppingListService } from '../../../services/shopping-list.service';
import { Ingredient } from '../../../models/ingredient.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CanDeactivateGuard } from '../../../can-deactivate-guard.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, CanDeactivateGuard {

  private shoppingListForm: FormGroup;

  constructor(
              private shoppingListService: ShoppingListService, 
              private router: Router, private route: ActivatedRoute,
              private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.shoppingListForm = new FormGroup({
      'ingredients': new FormArray([])
    });

    this.initData();
  }

  initData(){
   
    this.shoppingListService.getShoppingList().forEach(
      (ingredient: Ingredient) =>{
          let control: FormGroup = this.createIngredientFormGroup();
          control.setValue({
            'name': ingredient.name,
            'amount': ingredient.amount
          });
          (<FormArray>this.shoppingListForm.get('ingredients'))
          .push(control);
      }
    );
  }

  createIngredientFormGroup(){
    return new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required,Validators.min(1)])
    });
  }

  onAddIngredient() {
    const ingredient:FormGroup = this.createIngredientFormGroup();
    
    (<FormArray>this.shoppingListForm.get('ingredients')).insert(0,ingredient);
    this.shoppingListForm.markAsDirty();
    this.shoppingListForm.markAsTouched();
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.shoppingListForm.get('ingredients')).removeAt(index);
    this.shoppingListForm.markAsDirty();
    this.shoppingListForm.markAsTouched();
  }

  onCancel(){
    this.router.navigate(['/shopping-list']);
  }

  onSubmit(){
    this.shoppingListService.setShoppingList(this.shoppingListForm.get('ingredients').value);
    this.shoppingListForm.reset(this.shoppingListForm.value);
    this.flashMessagesService.show(
      `<div class="alert alert-success">
          <strong><span class="glyphicon glyphicon-saved"></span> Ingredients Saved </strong>
        </div>`
      , {cssClass: 'flash-message-custom', timeout: 2000, closeOnClick: true }
      );
  }

  canDeactivate(){
    console.log('can deactivate');
    if(!this.shoppingListForm.pristine){
      return confirm('Changes will be lost. Do you want to proceed without saving?');
    }
    return this.shoppingListForm.pristine;
  }
}
