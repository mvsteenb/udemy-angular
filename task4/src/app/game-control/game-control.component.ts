import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  currentInterval : number;
  intervalRef;

  constructor() { }

  ngOnInit(): void {
  }

  startGame() {
    console.log("Starting game...");
    this.intervalRef = setInterval(
      () => { console.log('tick' + this.intervalRef) },
      1000
    );
  }

  stopGame() {
    console.log("Stopping game...");
    clearInterval(this.intervalRef);
  }

}
