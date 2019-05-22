import {Confession} from "./models/confession.model";
import {Injectable} from "@angular/core";
import {UsersService} from "./users.service";
import {User} from "./models/user.model";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class ConfessionsService{
  startedEditing = new BehaviorSubject<number>(undefined);
  data = this.startedEditing.asObservable();

  constructor(private usersService: UsersService,
              private http: HttpClient){}

    ngOnInit(){
   // this.getConfessionsFromDB();
    }

  createConfession(title: string, content: string){

    const body = new HttpParams()
      .set('title', title)
      .set('content', content);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
       .set('Authorization', localStorage.getItem('jwt'));
  //  console.log(body.toString());
   // console.log(headers);
    return this.http.post("http://localhost:4000/api/confessions", body.toString(), {headers: headers})
      .pipe(map((response: Response) => {

      }));
  }

  getConfessions(){
     return this.http.get("http://localhost:4000/api/confessions");
  }

  getConfession(id: string){
    return this.http.get("http://localhost:4000/api/confessions/" + id);
  }


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
