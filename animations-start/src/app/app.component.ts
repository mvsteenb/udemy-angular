import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        'background-color': 'yellow',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate(300)),
      //transition('normal => highlighted', animate(300)),
      //transition('highlighted => normal', animate(300))
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0px) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('* <=> shrunken', [
        style({
          'background-color': 'orange',
        }),
        animate(1000, style({
          borderRadius: '50px'
        })),
        animate(500)
      ])
    ]),
    trigger('list1', [
      state('in', style({
        opacity: '1',
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity : '0',
          transform: 'translateX(-100px)'
        }),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({
          opacity : '0',
          transform: 'translateX(100px)'
        }))
      ]),
    ]),,
    trigger('list2', [
      state('in', style({
        opacity: '1',
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(1000)
      ]),
      transition('* => void', [
        animate(500, style({
          opacity : '0',
          transform: 'translateX(100px)'
        }))
      ]),
    ]),
  ]
})
export class AppComponent {

  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAnimate() {
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  onShrink() {
    console.log("shrinking !");
    this.wildState = 'shrunken';
  }

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }
}
