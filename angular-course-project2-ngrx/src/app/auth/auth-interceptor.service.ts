import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
import * as fromApp from "../store/app.reducer";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private store: Store
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    this.store.select('');

    /*return this.store.select('auth').pipe(
      take(1), 
      map(authState => { 
        return authState.user; 
      }).
      exhaustMap(
        user => {          
          if (!user) {          
            return next.handle(req);
          }          
          const modifiedRequest = req.clone({params: new HttpParams().set('auth', user.token)});
          return next.handle(modifiedRequest);
        }
      )
    );*/    
  }

}