import { Component } from "@angular/core";

@Component({
  selector: 'app-alert-success',
  template: '<h3>{{message}}</h3>',
  styles: [
    `
      h3 {
        background-color: green;
        padding: 20px;
        color: white;
        text-align: center;
      }
    `
  ]
})
export class AlertSuccessComponent {
  message = "Success";
}