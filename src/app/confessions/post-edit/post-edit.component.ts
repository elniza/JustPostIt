import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user.model";
import {PostsService} from "../posts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {takeUntil} from "rxjs/operators";
import {FormValidator} from "../../auth/form.validator";

@Component({
  selector: 'app-new-confession',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})

export class PostEditComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  action: string = 'Create';
  id: string;
  form: FormGroup;
  title: FormControl;
  content: FormControl;

  constructor(private route: ActivatedRoute,
              private postsService: PostsService,
              private router: Router,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    const urlSplitted = this.route.routeConfig.path.split('/');
    let formValidators = [];
    let titleInitValue = "";
    let contentInitValue = "";
    if(urlSplitted && urlSplitted[urlSplitted.length - 1] == 'edit'){
      this.action = 'Edit';
      this.id = this.route.snapshot.paramMap.get('id');
      titleInitValue = history.state.title;
      contentInitValue = history.state.content;
      formValidators.push(FormValidator.initValueChanged(['title', 'content'], [titleInitValue, contentInitValue]));
    }
    this.title = new FormControl(titleInitValue, [Validators.required]);
    this.content = new FormControl(contentInitValue, [Validators.required]);
    this.form = this.formBuilder.group({
      title: this.title,
      content: this.content
    });
    this.form.setValidators(formValidators);
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  postAction(){
    const { title, content } = this.form.value;
    if(this.action == 'Create'){
      this.postsService.createPost(title, content)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(
          (response: any) => {
           this.router.navigate(['/'],
             {state: {toastrMessage: response.message, toastrTitle: 'Add post'}});
          },
          (err) => {
            this.toastrService.error(err.error, 'Add post error');
          }
        );
    }
    else if(this.action == 'Edit'){
      this.postsService.editPost(this.id, title, content)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(
          (response: any) => {
            this.router.navigate(['posts', this.id],
              {state: {toastrMessage: response.message, toastrTitle: 'Edit post'}});
          },
          (err) => {
            this.toastrService.error(err.error, 'Edit post error');
          }
        );
    }
}

}
