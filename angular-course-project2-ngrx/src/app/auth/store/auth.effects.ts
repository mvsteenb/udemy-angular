import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";
import { User } from "../user.model";
import * as AuthActions from './auth.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
  const expirationDate = new Date(new Date().getTime()+(+expiresIn*1000));
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticationSuccess({ 
    email: email, 
    userId: userId, 
    token: token, 
    expirationDate: expirationDate,
    redirect: true
  });   
}

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred !';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
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
  return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {

  @Effect() // returns a dispatchable action !
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseAPIKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      )
      .pipe(
        tap(
          resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }
        ),
        map(
          resData => {
            return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken)
          }
        ),
        catchError(
          errorRes => {         
            return handleError(errorRes);
          }
        )
      )
    }),
  );

  @Effect({dispatch: false}) // does not return a dispatchable action !
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap( () => {
      this.authService.clearLogoutTimer();
      localStorage.clear();
      this.router.navigate(['/auth']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map( () => {

      console.log("HANDLING AUTO LOGIN !");

      const userData : {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      }= JSON.parse(localStorage.getItem('userData'));
  
      if (!userData) {
        console.log("NO USER DATA !");
        return { type: 'DUMMY' };
      }
  
      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
  
      if (loadedUser.token) {      
        console.log("USER DATA FOUND ON LOCAL STORAGE --> Auth succes !");

        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); 
        this.authService.setLogoutTimer(expirationDuration);

        return new AuthActions.AuthenticationSuccess(
          {
            email: loadedUser.email, 
            userId: loadedUser.id, 
            token: loadedUser.token, 
            expirationDate: new Date(userData._tokenExpirationDate),
            redirect: false
          }
        );
      }

      console.log("NO USER TOKEN FOUND !");
      return { type: 'DUMMY' };
    })
  );

  @Effect({dispatch: false}) // does not return a dispatchable action !
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS), 
    tap( (authSuccessAction: AuthActions.AuthenticationSuccess) => {
      if (authSuccessAction.payload.redirect) {
        console.log("REDIRECT TO ROOT");      
        this.router.navigate(['/']);
      }
    }) 
  );

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseAPIKey,
        {
          email: signupAction.payload.email,
          password: signupAction.payload.password,
          returnSecureToken: true
        }
      )
      .pipe(
        tap(
          resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }
        ),
        map(
          resData => {
            return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken)
          }
        ),
        catchError(
          errorRes => {         
            return handleError(errorRes);
          }
        )
      )
    })
  )
  
  constructor(
    private actions$: Actions, 
    private http: HttpClient,
    private router:  Router,
    private authService : AuthService
  ) {}

  
}