import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs';
import {ConfessionsService} from "./confessions.service";

@Injectable()
export class ConfessionResolverService implements Resolve<any> {

  constructor(private http: HttpClient,
              private confessionsService: ConfessionsService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.confessionsService.getConfession(route.params['id']);
  }

}
