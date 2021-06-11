import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  
  constructor(
    private authService: AuthService, 
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth').pipe(
    //return this.authService.userSubject.pipe(
      take(1), // automatically unsubscribes !!!
      map(authState => {
        return authState.user;
      }),
      map(
        user => { 
          const isAuth = !!user;
          if (isAuth) {
            return true;
          }
          return this.router.createUrlTree(['/auth']);
        }
      )
    );
  }

}