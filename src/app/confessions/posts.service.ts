import {Post} from "../models/post.model";
import {Injectable} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {User} from "../models/user.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Shared} from "../shared/shared";
import {ReplaySubject} from "rxjs";

@Injectable()
export class PostsService{
  isPostChanged: ReplaySubject<boolean>;

  constructor(private authService: AuthService,
              private http: HttpClient){
    this.isPostChanged = new ReplaySubject<boolean>(1);
  }

  createPost(title: string, content: string){
    const body = new HttpParams()
      .set('title', title)
      .set('content', content);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
       .set('Authorization', localStorage.getItem('jwt'));
    return this.http.post("http://localhost:4000/api/posts", body.toString(), {headers: headers})
      .pipe(
      catchError(Shared.handleError)
    );
  }

  getPosts(){
     return this.http.get("http://localhost:4000/api/posts")
       .pipe(
         catchError(Shared.handleError)
       );
  }

  getPost(id: string){
    return this.http.get("http://localhost:4000/api/posts/" + id)
      .pipe(
        catchError(Shared.handleError)
      );
  }

  deletePost(id: string){
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('jwt'));
    return this.http.delete("http://localhost:4000/api/posts/" + id, {headers: headers})
      .pipe(
        catchError(Shared.handleError)
      );
  }

  editPost(id: string, title: string, content: string){
    const body = new HttpParams()
      .set('title', title)
      .set('content', content);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('jwt'));
    return this.http.put("http://localhost:4000/api/posts/" + id, body.toString(), {headers: headers})
      .pipe(
        catchError(Shared.handleError)
      );
  }

}
