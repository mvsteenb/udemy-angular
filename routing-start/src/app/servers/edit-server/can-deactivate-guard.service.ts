import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterState, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  canDeactivate(
    component: CanComponentDeactivate,
    route : ActivatedRouteSnapshot,
    currentStatus : RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ) : Observable<boolean> | Promise<boolean> | boolean {
    console.log("Can de-activate ???");
    return component.canDeactivate();
  }

}