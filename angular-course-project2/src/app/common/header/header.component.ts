import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //selectedComponent = 'recipes';
  //@Output('componentChangeEvent') componentChangeEventEmitter = new EventEmitter<{component: string}>();

  constructor() { }

  ngOnInit(): void {
  }

  /*setSelectedComponent(componentName: string) {
    console.log("selected component: " + componentName);
    this.selectedComponent = componentName;
    this.componentChangeEventEmitter.emit({component : this.selectedComponent});
  }*/

}

