import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostsService} from "../posts.service";
import {Subject} from "rxjs";
import {concatMap, takeUntil} from 'rxjs/operators';
import {AuthService} from "../../auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {Shared} from "../../shared/shared";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  private ngUnsubscribe = new Subject();
id: string;
post;
isPostOwner: boolean;
isLoggedIn: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private postsService: PostsService,
              private authService: AuthService,
              private toastrService: ToastrService) { }

  ngOnInit() {
    console.log('in');
    this.id = this.route.snapshot.paramMap.get('id');
    //resolver data
    this.post = this.route.snapshot.data['post'];
    console.log(this.post);
    this.authService.loggedInUser
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (user: any) => {
          this.isLoggedIn = (user != null);
          this.isPostOwner = (user && user.id == this.post.author.id);
        }
      );
    this.postsService.isPostChanged
      .pipe(
        concatMap(
          () => { return this.postsService.getPost(this.id); }
          ),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (response: any) => {
          this.post = response;
        },
        (err) => {

        });
  }

  ngAfterViewInit() {
    Shared.showFlashMessageIfNeeded(this.toastrService);
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onEditPost(){
    this.router.navigate(['edit'],
      {state: {title: this.post.title, content: this.post.content}, relativeTo: this.route});
  }
  onDeletePost(){
    this.postsService.deletePost(this.id)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (response: any) => {
          this.router.navigate(['/'],
            {state: {toastrMessage: response.message, toastrTitle: 'Delete post'}});
        },
        (err) => {
          this.toastrService.error(err.error, 'Delete post error');
        }
      );
  }

  onComment(){
    this.router.navigate(['comments', 'new'], {relativeTo: this.route});
  }

}
