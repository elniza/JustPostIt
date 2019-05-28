import {Injectable} from "@angular/core";
import {User} from "../models/user.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Shared} from "../shared/shared";

@Injectable()
export class CommentsService{

  constructor(private http: HttpClient){}

  createComment(postId: string, content: string){
    const body = new HttpParams()
      .set('content', content);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('jwt'));
    return this.http.post(`http://localhost:4000/api/posts/${postId}/comments`, body.toString(), {headers: headers})
      .pipe(
        catchError(Shared.handleError)
      );
  }

  editComment(comment_id: string, content: string){
    const body = new HttpParams()
      .set('content', content);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('jwt'));
    return this.http.put(`http://localhost:4000/api/comments/${comment_id}`,
      body.toString(), {headers: headers})
      .pipe(
        catchError(Shared.handleError)
      );
  }

  deleteComment(comment_id: string){
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('jwt'));
    return this.http.delete(`http://localhost:4000/api/comments/${comment_id}`,{headers: headers})
      .pipe(
        catchError(Shared.handleError)
      );
  }

}
