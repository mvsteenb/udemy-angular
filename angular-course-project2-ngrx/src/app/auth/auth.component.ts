import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../common/alert/alert.component";
import { PlaceHolderDirective } from "../common/directives/placeholder/placeholder.directive";
import { AuthService, AuthResponseData } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {

  @ViewChild(PlaceHolderDirective, {static:false}) alertHost : PlaceHolderDirective;
  
  isLoginMode = true;
  isLoading = false;
  errorMessage: string;
  closeSub : Subscription;
  
  authObs: Observable<AuthResponseData> = new Observable();

  constructor(
    private authService : AuthService, 
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.value) {
      return;
    }

    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.authObs = this.authService.login(email, password);
    }
    else {
      this.authObs = this.authService.signup(email, password);
    }

    this.authObs.subscribe(
      resData => {
        console.log(resData);
        this.errorMessage = null;
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.isLoading = false;
        this.errorMessage = errorMessage;
        this.showErrorAlert(this.errorMessage);
      }
    );

    form.reset();
  }

  onCloseErrorDialog() {
    this.errorMessage = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe( () => {
      hostViewContainerRef.clear();
      this.closeSub.unsubscribe();
    });
  }
}