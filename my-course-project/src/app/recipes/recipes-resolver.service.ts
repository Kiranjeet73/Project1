import { Injectable } from "@angular/core";

import {Actions, ofType} from '@ngrx/effects';
import { take,map, switchMap} from 'rxjs/Operators';
import {of } from 'rxjs'

import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";
import * as RecipeActions from '../recipes/store/recipe.actions';


@Injectable({providedIn:'root'})
export class RecipesResolverService  {
constructor(private store: Store<fromApp.AppState>, private actions$: Actions){

}

resolve(){
 
    // return  this.dataStorageService.fetchRecipes()
return    this.store.select('recipes').pipe(
    take(1),
    map(recipeState =>{
        return recipeState.recipes;
    }),
switchMap(recipes => {
     if(recipes.length === 0){
        this.store.dispatch(new RecipeActions.FetchRecipes());
        return this.actions$.pipe(ofType( RecipeActions.SET_RECIPES),take(1));
     }else {
        return of(recipes)
     }
})
    );
    
   

}
}