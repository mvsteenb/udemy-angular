import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onLoadServers(id: number) {
    //this.router.navigate(['servers'], {relativeTo: this.route});
    this.router.navigate(['servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
  }
}
