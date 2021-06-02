import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(
    //   count => {
    //     console.log(count);
    //   }
    // );
    const customIntervalObservable = new Observable(
      observer => {
        let count:number = 0;
        setInterval(
          () => {
            observer.next(count);
            count++;
            if (count === 2) {
              observer.complete();
            }
            if (count > 3) {
              observer.error(new Error('Count is greater than 3 !'));
            }
            //observer.error();
            //observer.complete();
          }, 
          1000
        );
      }
    );

    this.firstObsSubscription = customIntervalObservable.pipe(
      filter(
        data => {
          return data > 0;
        }
      ),
      map(
        (data:number) => {
          return 'Round= ' + (data+1);
        }
      )
    ).subscribe(
      count => {
        console.log(count);      
      },
      error => {
        alert(error.message);
      },
      () => {
        console.log("completed !"); 
      }
    );
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }

}
