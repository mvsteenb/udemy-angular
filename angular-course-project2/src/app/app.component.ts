import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  selectedComponent: string = 'recipes';

  setSelectedComponent(event : {component: string}) {
    console.log("APP : selected component" + event.component);
    this.selectedComponent = event.component;
  }

}
