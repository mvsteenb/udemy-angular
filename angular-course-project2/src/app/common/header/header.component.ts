import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //selectedComponent = 'recipes';
  //@Output('componentChangeEvent') componentChangeEventEmitter = new EventEmitter<{component: string}>();

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onLoadData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  /*setSelectedComponent(componentName: string) {
    console.log("selected component: " + componentName);
    this.selectedComponent = componentName;
    this.componentChangeEventEmitter.emit({component : this.selectedComponent});
  }*/

}

