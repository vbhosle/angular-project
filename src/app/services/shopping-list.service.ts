import { Ingredient } from "../models/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{
    shoppingListUpdates: Subject<Ingredient[]> = new Subject<Ingredient[]>();

    private shoppingList: Ingredient[] = [
        { name: 'apple', amount: 2},
        { name: 'banana', amount: 1},
        { name: 'cherry', amount: 20},
        { name: 'cashew', amount: 2},
    ];

    getShoppingList():Ingredient[]{
        return this.shoppingList.slice();
    }

    setShoppingList(ingredients: Ingredient[]){
        this.shoppingList = ingredients.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        ingredients.forEach(
            (ingredient:Ingredient) => {
                this.mergeIngredient(ingredient);
            }
        );
        this.shoppingListUpdates.next(this.shoppingList.slice());
    }

    updateIngredient(index: number, ingredient: Ingredient){
        if (this.isValidIndex(index)) {
            this.shoppingList[index] = ingredient;
            this.shoppingListUpdates.next(this.shoppingList.slice());
        }
    }

    removeIngredient(index: number) {
        if (this.isValidIndex(index)) {
          this.shoppingList.splice(index, 1);
          this.shoppingListUpdates.next(this.shoppingList.slice());
        }
      }

    isValidIndex(index: number): boolean {
        return !(isNaN(index) || index >= this.shoppingList.length || index < 0);
    }

    mergeIngredient(ingredient: Ingredient){
        let existingIngredientIndex = this.shoppingList.findIndex(
            (currentIngredient: Ingredient) => {
                return currentIngredient.name === ingredient.name
            }
        );

        if(existingIngredientIndex == -1){
            this.shoppingList.push(ingredient);
        }
        else{
            this.shoppingList[existingIngredientIndex].amount += ingredient.amount;
        }
    }
}