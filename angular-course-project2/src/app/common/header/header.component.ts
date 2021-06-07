import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { DataStorageService } from '../services/data-storage.service';

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

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.userSubject.subscribe(
      (user: User) => {
        this.currentUser = user;
        this.isAuthenticated = !!this.currentUser;
      }
    )
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onLoadData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
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

