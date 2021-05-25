import { Component, OnInit } from '@angular/core';
import { bindCallback } from 'rxjs';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.css']
})
export class UserNameComponent implements OnInit {

  userName: string;
  detailsVisible = false;
  detailsButtonEventLog = [];

  constructor() { }

  ngOnInit(): void {
  }

  resetUserName() {
    this.userName = "";
  }

  handleDisplayDetails() {
    this.detailsVisible = !this.detailsVisible;
    //this.detailsButtonEventLog.push(this.detailsButtonEventLog.length+1);
    this.detailsButtonEventLog.push(new Date());
  }

}
