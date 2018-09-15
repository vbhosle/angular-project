import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private shoppingList: Ingredient[] = [];
  private listSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingList = this.shoppingListService.getShoppingList();
    this.listSubscription = this.shoppingListService.shoppingListUpdates.subscribe(
      (ingredients: Ingredient[]) =>{
        this.shoppingList = ingredients;
      }
    );
  }

  ngOnDestroy(){
    this.listSubscription.unsubscribe();
  }
}
