import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {CommentsService} from "../comments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Location} from "@angular/common";
import {Subject, Subscription} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  action: string = 'Create';
  confessionId: string;
  commentId: string;
  content: string;

  constructor(private commentsService: CommentsService,
              private route: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService,
              private location: Location) { }

  ngOnInit() {
    this.confessionId = this.route.snapshot.paramMap.get('id');
    this.commentId = this.route.snapshot.paramMap.get('comment_id');
    const urlSplitted = this.route.routeConfig.path.split('/');
    if(urlSplitted && urlSplitted[urlSplitted.length - 1] == 'edit'){
      this.action = 'Edit';
      this.content = history.state.content;
    }
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  commentAction(commentForm: NgForm){
    const content = commentForm.controls['content'].value;
    if(this.action == 'Create'){
      this.commentsService.createComment(this.confessionId, content)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(
          (response: any) => {
            this.router.navigate(['confessions', this.confessionId],
              {state: {toastrMessage: response.message, toastrTitle: 'Create comment'}});
          },
          (err) => {
            this.toastrService.error(err.error, 'Create comment error');
          }
        );
    }
    else if(this.action == 'Edit'){
      this.commentsService.editComment(this.commentId, content)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(
          (response: any) => {
            this.router.navigate(['confessions', this.confessionId],
              {state: {toastrMessage: response.message, toastrTitle: 'Edit comment'}});
          },
          (err) => {
            this.toastrService.error(err.error, 'Edit comment error');
          }
        );
    }
  }

}
