import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { error } from "selenium-webdriver";

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

  authResponse: AuthResponseData;

  constructor(private http: HttpClient) {

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
    .pipe(catchError(this.handleError));
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
    .pipe(catchError(this.handleError));
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