import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Confession} from "../models/confession.model";
import {User} from "../models/user.model";
import {ConfessionsService} from "../confessions.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Router, UrlSegment} from "@angular/router";
import {Subject, Subscription} from "rxjs";
import {ToastrService, ToastToken} from "ngx-toastr";
import {Location} from "@angular/common";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-new-confession',
  templateUrl: './confession-edit.component.html',
  styleUrls: ['./confession-edit.component.css']
})

export class ConfessionEditComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  title: string;
  content: string;
  action: string = 'Create';
  id: string;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private confessionsService: ConfessionsService,
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

  confessionAction(confessionForm: NgForm){
    const title =  confessionForm.controls['title'].value;
    const content = confessionForm.controls['content'].value;
    if(this.action == 'Create'){
      this.confessionsService.createConfession(title, content)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(
          (response: Response) => {
           this.location.back();
           this.toastrService.success(response.message, 'Add confession');
          }
        );
    }
    else if(this.action == 'Edit'){
      this.confessionsService.editConfession(this.id, title, content)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(
          (response: Response) => {
            this.location.back();
          this.toastrService.success(response.message, 'Update confession');
        });
    }
}

}
