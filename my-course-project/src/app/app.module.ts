import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreRouterConnectingModule } from '@ngrx/router-store';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AppRoutingModule } from './app-routing.module';
import { LoggingService } from './logging.service';
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects'
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { RecipeEffects } from './recipes/store/recipe.effects';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ],
  imports: [
    BrowserModule,      //ngIf and ngFor are provided by this
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({logOnly:environment.production}),
    StoreRouterConnectingModule.forRoot(),
    SharedModule,
    CoreModule,
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    
  ],
providers:[LoggingService],
bootstrap: [AppComponent],
 
})
export class AppModule { }
