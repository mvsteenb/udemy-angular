import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostsService {
  
  error = new Subject<string>();

  constructor(private http : HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData : Post = {title: title, content: content};
    console.log(postData);
    this.http.post<{name: string}>(
      'https://ng-complete-guide-fc4f5-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      postData,
      {
        observe: 'response'
      }
    )
    .subscribe(
      (responseData) => {
        console.log(responseData.body);
      },
      error => {
        this.error.next(error.message);
      }
    );
  }

  fetchPosts() : Observable<Post[]> {
    let  searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http
    .get<{[key: string]: Post }>(
      'https://ng-complete-guide-fc4f5-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      {
        headers: new HttpHeaders({'Custom-Header' : 'Hello'}),
        params: searchParams
      }
    )
    .pipe(map((responseData) => {
      const postsArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({ ...responseData[key], id: key});
        }
      }      
      return postsArray;
    }),
    catchError(errorRes => {
      // send error to analytics server !
      return throwError(errorRes);
    })
    );    
  }

  deleteAllPosts() {
    return this.http.delete(
      'https://ng-complete-guide-fc4f5-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      {
        observe: 'events',
        responseType : 'json' // or text or blob
      }
    ).pipe(
      tap(
        event => {
          console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        }
      )
    );
  }
}