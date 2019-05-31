import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {PostsService} from "./posts.service";

@Injectable()
export class PostsResolverService implements Resolve<any> {

  constructor(private http: HttpClient,
              private postsService: PostsService) {
  }

  resolve(): Observable<any> {
    //get posts before loading page
    return this.postsService.getPosts();
  }

}
