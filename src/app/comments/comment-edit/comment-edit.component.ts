import {Component, OnInit} from '@angular/core';
import {CommentsService} from "../comments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {FormValidator} from "../../shared/form.validator";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  action: string = 'Create';
  postId: string;
  commentId: string;
  form: FormGroup;
  content: FormControl;

  constructor(private commentsService: CommentsService,
              private route: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    const urlSplitted = this.route.routeConfig.path.split('/');
    let formValidators = [];
    let contentInitValue = "";
    if (urlSplitted && urlSplitted[urlSplitted.length - 1] == 'edit') {
      this.action = 'Edit';
      this.commentId = this.route.snapshot.paramMap.get('comment_id');
      contentInitValue = history.state.content;
      formValidators.push(FormValidator.initValueChanged(['content'], [contentInitValue]));
    }
    this.content = new FormControl(contentInitValue, [Validators.required]);
    this.form = this.formBuilder.group({
      content: this.content
    });
    this.form.setValidators(formValidators);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  commentAction() {
    const content = this.form.value.content;
    if (this.action == 'Create') {
      this.commentsService.createComment(this.postId, content)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(
          (response: any) => {
            this.router.navigate(['posts', this.postId],
              {state: {toastrMessage: response.message, toastrTitle: 'Create comment'}});
          },
          (err) => {
            this.toastrService.error(err.error, 'Create comment error');
          }
        );
    }
    else if (this.action == 'Edit') {
      this.commentsService.editComment(this.commentId, content)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(
          (response: any) => {
            this.router.navigate(['posts', this.postId],
              {state: {toastrMessage: response.message, toastrTitle: 'Edit comment'}});
          },
          (err) => {
            this.toastrService.error(err.error, 'Edit comment error');
          }
        );
    }
  }

}
