import {User} from "./models/user.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, map} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {Shared} from "./shared/shared";

@Injectable()
export class UsersService{
  loggedInUser: BehaviorSubject<Object>;

  constructor(private http: HttpClient){
    this.loggedInUser = new BehaviorSubject<Object>(null);
  }

  getToken(): string {
    return localStorage['jwt'];
  }

  saveToken(token: string) {
    localStorage['jwt'] = token;
  }

  destroyToken() {
    localStorage.removeItem('jwt');
  }

  logout() {
    this.destroyToken();
    this.loggedInUser.next(null);
  }

  saveUser(username: string, password: string){
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post("http://localhost:4000/api/saveUser", body.toString(), {headers: headers})
      .pipe(
        catchError(Shared.handleError)
      );
  }

  login(username: string, password: string){
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post("http://localhost:4000/api/login", body.toString(), {headers: headers})
      .pipe(
      map((response: Response) => {
        this.loggedInUser.next({'username': `${response.username}`, 'id': `${response.user_id}`});
        this.saveToken(response.token);
        return response;
      }),
        catchError(Shared.handleError));
  }
}
