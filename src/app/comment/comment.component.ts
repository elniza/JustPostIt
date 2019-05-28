import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../users.service";
import {CommentsService} from "../comments.service";
import {ToastrService} from "ngx-toastr";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {ConfessionsService} from "../confessions.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  @Input() comment;
  commentId: string;
  isCommentOwner: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private usersService: UsersService,
              private commentsService: CommentsService,
              private toastrService: ToastrService,
              private confessionsService: ConfessionsService) { }

  ngOnInit() {
    this.commentId = this.comment._id;
    this.usersService.loggedInUser
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (user: any) => {
          this.isCommentOwner = (user && user.id == this.comment.author.id);
        }
      )
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onEditComment(){
    this.router.navigate(['comments', '' + this.commentId, 'edit'], {state: {content: this.comment.content}, relativeTo: this.route});
  }

  onDeleteComment(){
   this.commentsService.deleteComment(this.commentId)
     .pipe(
       takeUntil(this.ngUnsubscribe)
     )
      .subscribe(
        (response: any) => {
          this.confessionsService.isConfessionChanged.next(true);
          this.toastrService.success(response.message, 'Delete comment');
        },
        (err) => {
          this.toastrService.error(err.error, 'Delete comment error');
        }
      );
  }
}
