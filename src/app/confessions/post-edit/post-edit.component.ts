import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {User} from "../../models/user.model";
import {PostsService} from "../posts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Location} from "@angular/common";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-new-confession',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})

export class PostEditComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  title: string;
  content: string;
  action: string = 'Create';
  id: string;

  constructor(private route: ActivatedRoute,
              private postsService: PostsService,
              private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit() {
    const urlSplitted = this.route.routeConfig.path.split('/');
    if(urlSplitted && urlSplitted[urlSplitted.length - 1] == 'edit'){
      this.action = 'Edit';
      this.id = this.route.snapshot.paramMap.get('id');
      this.title = history.state.title;
      this.content = history.state.content;
    }
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  postAction(postForm: NgForm){
    const title =  postForm.controls['title'].value;
    const content = postForm.controls['content'].value;
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
