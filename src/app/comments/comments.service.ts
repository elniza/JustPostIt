import {Injectable} from "@angular/core";
import {User} from "../models/user.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Shared} from "../shared/shared";
import {config} from "../../../config/frontend.config";

@Injectable()
export class CommentsService{
  url: string;

  constructor(private http: HttpClient){
    this.url = config.serverUrl;
  }

  createComment(postId: string, content: string){
    const body = new HttpParams()
      .set('content', content);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('jwt'));
    return this.http.post(`${this.url}/api/posts/${postId}/comments`, body.toString(), {headers: headers})
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
    return this.http.put(`${this.url}/api/comments/${comment_id}`,
      body.toString(), {headers: headers})
      .pipe(
        catchError(Shared.handleError)
      );
  }

  deleteComment(comment_id: string){
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('jwt'));
    return this.http.delete(`${this.url}/api/comments/${comment_id}`,{headers: headers})
      .pipe(
        catchError(Shared.handleError)
      );
  }

}
