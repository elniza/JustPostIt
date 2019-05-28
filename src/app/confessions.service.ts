import {Confession} from "./models/confession.model";
import {Injectable} from "@angular/core";
import {UsersService} from "./users.service";
import {User} from "./models/user.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Shared} from "./shared/shared";
import {ReplaySubject} from "rxjs";

@Injectable()
export class ConfessionsService{
  isConfessionChanged: ReplaySubject<boolean>;

  constructor(private usersService: UsersService,
              private http: HttpClient){
    this.isConfessionChanged = new ReplaySubject<boolean>(1);
  }

    ngOnInit(){
    }

  createConfession(title: string, content: string){

    const body = new HttpParams()
      .set('title', title)
      .set('content', content);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
       .set('Authorization', localStorage.getItem('jwt'));
    return this.http.post("http://localhost:4000/api/confessions", body.toString(), {headers: headers})
      .pipe(
      catchError(Shared.handleError)
    );
  }

  getConfessions(){
     return this.http.get("http://localhost:4000/api/confessions")
       .pipe(
         catchError(Shared.handleError)
       );
  }

  getConfession(id: string){
    return this.http.get("http://localhost:4000/api/confessions/" + id)
      .pipe(
        catchError(Shared.handleError)
      );
  }

  deleteConfession(id: string){
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('jwt'));
    return this.http.delete("http://localhost:4000/api/confessions/" + id, {headers: headers})
      .pipe(
        catchError(Shared.handleError)
      );
  }

  editConfession(id: string, title: string, content: string){
    const body = new HttpParams()
      .set('title', title)
      .set('content', content);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('jwt'));
    return this.http.put("http://localhost:4000/api/confessions/" + id, body.toString(), {headers: headers})
      .pipe(
        catchError(Shared.handleError)
      );
  }

}
