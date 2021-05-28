import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  inactiveActions: number = 0;
  activeActions: number = 0;

  constructor() { }

  incrementInactiveActionCount() {
    this.inactiveActions++;
  }

  incrementActiveActionCount() {
    this.activeActions++;
  }
}
