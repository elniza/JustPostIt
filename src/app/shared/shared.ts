import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

export class Shared {
  constructor() {}

  static handleError(err: HttpErrorResponse){
    return throwError(err);
  };
}
