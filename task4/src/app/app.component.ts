import { Component } from '@angular/core';
import { TickEvent } from './model/tickEvent.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task4';
  events: TickEvent[] = [];

  handleTickEvent(event: TickEvent) {
    console.log("Got tick event: " + event.tick);
    this.events.push(event);
  }
}
