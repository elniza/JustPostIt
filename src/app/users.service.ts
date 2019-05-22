
import {User} from "./models/user.model";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, map} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";


@Injectable()
export class UsersService{
  isLoggedIn: BehaviorSubject<string>;

  constructor(private http: HttpClient){
    this.isLoggedIn = new BehaviorSubject<string>(null);
  }

  ngOnInit(){

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
    this.isLoggedIn.next(null);
  }

  saveUser(username: string, password: string){
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post("http://localhost:4000/api/saveUser", body.toString(), {headers: headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse)  {
  return throwError(err);
};

  login(username: string, password: string){
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post("http://localhost:4000/api/login", body.toString(), {headers: headers})
      .pipe(
      map((response: Response) => {
        this.isLoggedIn.next(response.username);
        this.saveToken(response.token);
        return response;
      }),
        catchError(this.handleError));
  }
}
