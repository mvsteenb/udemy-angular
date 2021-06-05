import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators'
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.http.post<{name: string}>('https://ng-complete-guide-fc4f5-default-rtdb.europe-west1.firebasedatabase.app/posts.json',postData).subscribe(
      (responseData) => {
        console.log(responseData);
      }
    );
  }

  onFetchPosts() {
    this.http
    .get<{[key: string]: Post }>('https://ng-complete-guide-fc4f5-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
    .pipe(map((responseData) => {
      const postsArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({ ...responseData[key], id: key});
        }
      }
      return postsArray;
    }))
    .subscribe(
      (responseData) => {
        console.log(responseData);
        this.loadedPosts = responseData;
      }
    );
  }

  onClearPosts() {
    // Send Http request
  }
}
