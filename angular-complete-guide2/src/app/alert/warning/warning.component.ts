import { Component } from "@angular/core";

@Component({
  selector: 'app-alert-warning',
  templateUrl: 'warning.component.html',
  styleUrls: ['warning.component.css']
})
export class AlertWarningComponent {
  message = "ALERT !!!";
}