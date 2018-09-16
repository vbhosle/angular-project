import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouterModule } from './app-router.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './components/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipeFormComponent } from './components/recipes/recipe-form/recipe-form.component';
import { ShoppingListEditComponent } from './components/shopping-list/shopping-list-edit/shopping-list-edit.component';

import { RecipesService } from './services/recipes.service';
import { ShoppingListService } from './services/shopping-list.service';
import { CanDeactivateGuard } from './can-deactivate-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    ShoppingListComponent,
    RecipeFormComponent,
    ShoppingListEditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRouterModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [ RecipesService, ShoppingListService, CanDeactivateGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
