import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  canActivate(router : ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("Can Activate ???");
    return this.authService.isAuthenticated().then(
      (authenticated: boolean) => {
        if (authenticated) {
          return true;
        }
        else {
          console.log("Not allowed : redirecting to home...");
          this.router.navigate(['/']);          
        }
      }
    );
  }

  canActivateChild(router: ActivatedRouteSnapshot, state : RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(router, state);
  }
}