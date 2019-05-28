import {User} from "../models/user.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, map} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {Shared} from "../shared/shared";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class AuthService{
  loggedInUser: BehaviorSubject<Object>;

  constructor(private http: HttpClient,
              private toastrService: ToastrService){
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

  logout(logoutMessage: string) {
    this.destroyToken();
    this.loggedInUser.next(null);
    this.toastrService.success(logoutMessage, "Logged out");
  }

  signUp(username: string, password: string){
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post("http://localhost:4000/api/signUp", body.toString(), {headers: headers})
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
      map((response: any) => {
        this.loggedInUser.next({'username': `${response.username}`, 'id': `${response.user_id}`});
        this.saveToken(response.token);
        return response;
      }),
        catchError(Shared.handleError));
  }
}
