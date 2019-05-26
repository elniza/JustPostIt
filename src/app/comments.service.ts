import {Confession} from "./models/confession.model";
import {Injectable} from "@angular/core";
import {UsersService} from "./users.service";
import {User} from "./models/user.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Shared} from "./shared/shared";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class CommentsService{
  isCommentDeleted: BehaviorSubject<boolean>;
  constructor(private usersService: UsersService,
              private http: HttpClient){
    this.isCommentDeleted = new BehaviorSubject<boolean>(false);
  }

  ngOnInit(){

  }

  createComment(confessionId: string, content: string){
    const body = new HttpParams()
      .set('content', content);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('jwt'));
    return this.http.post(`http://localhost:4000/api/confessions/${confessionId}/comments`, body.toString(), {headers: headers})
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


  // getConfessions(){
  //   return this.http.get("http://localhost:4000/api/confessions")
  //     .pipe(
  //       catchError(UsersService.handleError)
  //     );
  // }
  //
  // getConfession(id: string){
  //   return this.http.get("http://localhost:4000/api/confessions/" + id)
  //     .pipe(
  //       catchError(UsersService.handleError)
  //     );
  // }
  //
  // editConfession(id: string, title: string, content: string){
  //   const body = new HttpParams()
  //     .set('title', title)
  //     .set('content', content);
  //   const headers = new HttpHeaders()
  //     .set('Content-Type', 'application/x-www-form-urlencoded')
  //     .set('Authorization', localStorage.getItem('jwt'));
  //   return this.http.put("http://localhost:4000/api/confessions/" + id, body.toString(), {headers: headers})
  //     .pipe(
  //       catchError(UsersService.handleError)
  //     );
  // }


//   startEditingAndSendIndex(id: number){
//     this.startedEditing.next(id);
//   }
//
//   addLike(id: number, user: User){
//     this.getConfession(id).likes.push(user);
//   }
//
//   removeLike(id: number, user: User){
//    const index = this.getConfession(id).likes.indexOf(user);
//    this.getConfession(id).likes.splice(index, 1);
//   }
//

//   getConfession(id: number){
//     return this.confessions[id];
// }
//
//   addConfession(confession: Confession){
//     return this.confessions.push(confession);
//   }
//   updateConfession(id: number, confession: Confession){
//     this.confessions[id] = confession;
//   }

}
