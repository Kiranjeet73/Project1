import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RecipesActions from './recipe.actions'
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';


@Injectable()
export class RecipeEffects {

FetchRecipes = createEffect(() => this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() =>{
        return this.http.get<Recipe[]>(
            'https://ng-course-recipe-book-83ebc-default-rtdb.firebaseio.com/recipes.json'
           
            );
    }),
    map(recipes => {
        return recipes.map(recipe =>{
             return{...recipe, ingredients:recipe.ingredients ? recipe.ingredients:[]
            };
        });
    }),
    map(recipes =>{
        return new RecipesActions.SetRecipes(recipes);
    })
));

storeRecipes = createEffect( () => 
    this.actions$
    .pipe(
        ofType(RecipesActions.STORE_RECIPES), 
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState] ) => {
    return    this.http.put
    ('https://ng-course-recipe-book-83ebc-default-rtdb.firebaseio.com/recipes.json', 
    recipesState.recipes);
    }),
    
    )
,
{dispatch : false}
)

    constructor(private actions$: Actions, private http:HttpClient , private store: Store<fromApp.AppState>   ){

    }
} 