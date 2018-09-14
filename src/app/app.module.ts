import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './components/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { AppRouterModule } from './app-router.module';
import { RecipesService } from './services/recipes.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    ShoppingListComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule
  ],
  providers: [ RecipesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
