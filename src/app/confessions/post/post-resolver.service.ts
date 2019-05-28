import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs';
import {PostsService} from "../posts.service";

@Injectable()
export class PostResolverService implements Resolve<any> {

  constructor(private http: HttpClient,
              private postsService: PostsService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.postsService.getPost(route.params['id']);
  }

}
