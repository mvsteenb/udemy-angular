import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthService, AuthResponseData } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  isLoginMode = true;
  isLoading = false;
  errorMessage: string;

  authObs: Observable<AuthResponseData> = new Observable();

  constructor(private authService : AuthService) {}

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
      },
      errorMessage => {
        console.log(errorMessage);
        this.isLoading = false;
        this.errorMessage = errorMessage;
      }
    );

    form.reset();
  }

}