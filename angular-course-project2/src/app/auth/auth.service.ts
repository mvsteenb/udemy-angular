import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { error } from "selenium-webdriver";
import { User } from "./user.model";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  userSubject= new BehaviorSubject<User>(null);
  authResponse: AuthResponseData;
  tokenExpirationTimer: any;
    
  constructor(private http: HttpClient, private router: Router) {

  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAyRLm0M3KYwY_THsE_39DSbRwTOTlhik',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError),
      tap(
        responseData => {
          this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        }
      )
    );
  }

  logout() {
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
    localStorage.clear();

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }    
  }

  login(email: string, password: string) {
    console.log('**** LOGIN');
    console.log('email: ' + email);
    console.log('password: ' + password);
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAyRLm0M3KYwY_THsE_39DSbRwTOTlhik',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError),
      tap(
        responseData => {
          this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        }
      )
    );
  }

  autoLogin() {
    const userData : {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    }= JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {      
      this.userSubject.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }

  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime()+(expiresIn*1000));
    const user:User = new User(email, userId, token, expirationDate);
    this.userSubject.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(expiresIn);
    console.log("Authentication succeeded !")
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred !';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already !';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found !';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password !';
        break;
      case 'USER_DISABLED':
        errorMessage = 'User disabled !';
        break;
    }
    console.log("GOT ERROR: " + errorMessage);
    return throwError(errorMessage);
  }

}