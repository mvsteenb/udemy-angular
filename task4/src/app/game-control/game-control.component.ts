import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TickEvent } from '../model/tickEvent.model';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  currentInterval : number;
  intervalRef; 
  @Output('tickEvent') tickEventEmitter = new EventEmitter<TickEvent>();
  tick: number = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

  startGame() {
    console.log("Starting game...");
    this.intervalRef = setInterval(
      () => { 
        this.tick++;
        this.tickEventEmitter.emit(new TickEvent(this.tick));
      },
      1000
    );
  }

  stopGame() {
    console.log("Stopping game...");
    this.tick = 0;
    clearInterval(this.intervalRef);
  }

}
