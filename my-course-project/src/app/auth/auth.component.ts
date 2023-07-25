import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
isLoginMode= true;
isLoading =false; 
error:string =null;
@ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

private closeSub : Subscription;
private storeSub: Subscription;

constructor(
  private componentFactoryResolver: ComponentFactoryResolver,
  private store: Store<fromApp.AppState>){}

  ngOnInit(): void {
  this.storeSub =  this.store.select('auth').subscribe(authState =>{
this.isLoading = authState.loading;
this.error = authState.authError;
if(this.error){
  this.showErrorAlert(this.error);
}
    })
  }

onSwitchMode(){
  this.isLoginMode = !this.isLoginMode;
}

onSubmit(form:NgForm){
  if(!form.valid){
    return;
  }

const email = form.value.email;
const password = form.value.password;

this.isLoading =true;

if(this.isLoginMode){
  //authObs = this.authService.login(email, password);
  this.store.dispatch(new AuthActions.LoginStart({email:email, password:password}));
}else{
  this.store.dispatch(new AuthActions.SignupStart({email:email, password:password}))
}

 
form.reset();
}

onHandleError(){
  this.store.dispatch( new AuthActions.ClearError())
}

ngOnDestroy(): void {
  if(this.closeSub){
    this.closeSub.unsubscribe();
  } if(this.storeSub){
    this.storeSub.unsubscribe();
  }
} 

private showErrorAlert(message:string){
  // const alertCmp = new AlertComponent(); this won't work
 const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

 const hostViewContainerRef = this.alertHost.viewContainerRef  ;
 hostViewContainerRef.clear();

 const ComponentRef = hostViewContainerRef.createComponent(alertCmpFactory);
 ComponentRef.instance.message = message;

 this.closeSub = ComponentRef.instance.close.subscribe(() =>{
  this.closeSub.unsubscribe();
  hostViewContainerRef.clear();
 })
 
}

}
