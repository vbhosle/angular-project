import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './components/recipes/recipe-form/recipe-form.component';
import { ShoppingListEditComponent } from './components/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { CanDeactivateGuard } from './can-deactivate-guard.service';

const appRoutes: Routes = [
    { path:'recipes', component: RecipesComponent, children:[
        { path:'new', component: RecipeFormComponent, canDeactivate: [CanDeactivateGuard]},
        { path:':index', component: RecipeDetailComponent},
        { path:':index/edit', component: RecipeFormComponent, canDeactivate: [CanDeactivateGuard]}
    ]},
    { path:'shopping-list', component: ShoppingListComponent},
    { path:'shopping-list/edit', component: ShoppingListEditComponent, canDeactivate: [CanDeactivateGuard]},
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