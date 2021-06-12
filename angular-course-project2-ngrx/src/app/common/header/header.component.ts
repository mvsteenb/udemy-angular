import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { DataStorageService } from '../services/data-storage.service';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipes.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUser : User;
  authSubscription: Subscription;
  isAuthenticated = false;

  //selectedComponent = 'recipes';
  //@Output('componentChangeEvent') componentChangeEventEmitter = new EventEmitter<{component: string}>();

  constructor(
    private dataStorageService: DataStorageService, 
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    //this.authSubscription = this.authService.userSubject.subscribe(
    this.store.select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.currentUser = user;
        this.isAuthenticated = !!this.currentUser;
      }
    )
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onLoadData() {
    //this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  /*setSelectedComponent(componentName: string) {
    console.log("selected component: " + componentName);
    this.selectedComponent = componentName;
    this.componentChangeEventEmitter.emit({component : this.selectedComponent});
  }*/

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}

