import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CounterService } from '../services/counter.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {
  users: string[];
  //@Output() userSetToInactive = new EventEmitter<number>();

  constructor(
    private usersService: UsersService,
    private counterService: CounterService
  ) {}

  ngOnInit() {
    this.users = this.usersService.activeUsers;
  }

  onSetToInactive(id: number) {
    //this.userSetToInactive.emit(id);
    this.usersService.setUserInactive(id);

  }
}
