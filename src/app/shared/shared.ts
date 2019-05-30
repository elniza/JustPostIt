import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";

export class Shared {
  constructor() {
  }

  //throws errors
  static handleError(err: HttpErrorResponse) {
    return throwError(err);
  }

  //show success files in loading page after the last action
  static showFlashMessageIfNeeded(toastrService: ToastrService) {
    const state = history.state;
    if (state.hasOwnProperty('toastrMessage')) {
      setTimeout(() => {
        toastrService.success(state.toastrMessage, state.toastrTitle);
      }, 0);
    }
  }

}
