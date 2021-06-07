import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.userSubject.pipe(
      take(1), // automatically unsubscribes !!!
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