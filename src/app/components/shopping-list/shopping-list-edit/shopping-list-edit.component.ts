import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ShoppingListService } from '../../../services/shopping-list.service';
import { Ingredient } from '../../../models/ingredient.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  private shoppingListForm: FormGroup;

  constructor(private shoppingListService: ShoppingListService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.shoppingListForm = new FormGroup({
      'ingredients': new FormArray([])
    });

    this.initData();
  }

  initData(){
    this.shoppingListForm.setValue({
      'ingredients': []
    });
    

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
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.shoppingListForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['/shopping-list']);
  }

  onSubmit(){
    this.shoppingListService.setShoppingList(this.shoppingListForm.get('ingredients').value);
    this.router.navigate(['/shopping-list']);
  }


}
