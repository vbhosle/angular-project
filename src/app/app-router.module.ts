import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './components/recipes/recipe-form/recipe-form.component';

const appRoutes: Routes = [
    { path:'recipes', component: RecipesComponent, children:[
        { path:'new', component: RecipeFormComponent},
        { path:':index', component: RecipeDetailComponent},
        { path:':index/edit', component: RecipeFormComponent}
    ]},
    { path:'shopping-list', component: ShoppingListComponent },
    { path:'', redirectTo: 'recipes', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouterModule{

}