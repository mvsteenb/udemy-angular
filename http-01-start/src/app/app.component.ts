import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators'
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  errorSubscription : Subscription;

  loadedPosts: Post[] = [];
  isFetching = false;
  errorMessage = null;

  constructor(
    private http: HttpClient,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.errorSubscription = this.postsService.error.subscribe(
      errorMessage => {
        this.errorMessage = errorMessage;
      }
    );

    this.onFetchPosts();
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      (postData) => {
        this.isFetching = false;
        this.loadedPosts = postData;
      },
      error => {
        this.errorMessage = error.message;
        console.log(error);
      }
    );
  }

  onClearPosts() {
    this.postsService.deleteAllPosts().subscribe(
      () => {
        this.loadedPosts = [];
      }
    );
  }
}
