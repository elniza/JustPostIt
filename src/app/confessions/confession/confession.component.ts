import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, Router} from "@angular/router";
import {ConfessionsService} from "../../confessions.service";
import {Confession} from "../../models/confession.model";
import {Subject, Subscription} from "rxjs";
import {concatMap, takeUntil} from 'rxjs/operators';
import {UsersService} from "../../users.service";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {CommentsService} from "../../comments.service";

@Component({
  selector: 'app-post',
  templateUrl: './confession.component.html',
  styleUrls: ['./confession.component.css']
})
export class ConfessionComponent implements OnInit {
  private ngUnsubscribe = new Subject();
id: string;
confession;
like: string = 'Like';
isConfessionOwner: boolean;
isLoggedIn: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private confessionsService: ConfessionsService,
              private usersService: UsersService,
              private location: Location,
              private toastrService: ToastrService,
              private commentsService: CommentsService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.confession = this.route.snapshot.data['confession'];
    this.usersService.loggedInUser
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (user: object) => {
          this.isLoggedIn = (user != null);
          this.isConfessionOwner = (user && user.id == this.confession.author);
        }
      );
    this.commentsService.isCommentDeleted
      .pipe(
        concatMap(
          () => { return this.confessionsService.getConfession(this.id); }
          ),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (response: any) => {
          this.confession = response;
        });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onEditConfession(){
    this.router.navigate(['edit'],
      {state: {title: this.confession.title, content: this.confession.content}, relativeTo: this.route});
  }
  onDeleteConfession(){
    this.confessionsService.deleteConfession(this.id)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (response: Response) => {
          this.location.back();
          this.toastrService.success(response.message, 'Delete confession');
        }
      );
  }

  onComment(){
    this.router.navigate(['comments', 'new'], {relativeTo: this.route});
  }

  onLike(){
    if(this.like==='Like'){
      this.like = 'Unlike';
      // this.confessionsService.addLike(this.id, this.confession.author);
    }
    else{
      this.like = 'Like';
      // this.confessionsService.removeLike(this.id, this.confession.author);
    }

  }

}
