import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";





const appRoutes: Routes =[  
    {path:'', redirectTo:'/recipes', pathMatch:'full'} ,
    {path:'recipes', 
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)} ,
    {path:'shopping-list',
     loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)}   ,
     {path:'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}       // routes are simply array of javascript objects where each object represent a route




];

@NgModule({                 // we add NgModule to transform typescript class to anbular module
imports:[RouterModule.forRoot(appRoutes, {preloadingStrategy:PreloadAllModules} )],
exports:[RouterModule]

})                //ngmodule takes a javascript object 


export class AppRoutingModule{

}