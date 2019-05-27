import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs';
import {ConfessionsService} from "./confessions.service";

@Injectable()
export class ConfessionsResolverService implements Resolve<any> {

  constructor(private http: HttpClient,
              private confessionsService: ConfessionsService) { }

  resolve(): Observable<any> {
    console.log('resolve');
    return this.confessionsService.getConfessions()
      .pipe(
        // take(1)
      );
  }

}
