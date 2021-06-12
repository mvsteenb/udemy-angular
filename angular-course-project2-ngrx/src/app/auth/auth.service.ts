import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as AuthActions from '../auth/store/auth.actions';

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
  tokenExpirationTimer: any;
    
  constructor(
    private store: Store
  ) {}

  setLogoutTimer(expirationDuration: number) {
    console.log("TOKEN EXPIRATION TIMER DURATION : " + expirationDuration)
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout())
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

}