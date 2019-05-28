import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfessionsService} from "../../confessions.service";
import {Confession} from "../../models/confession.model";
import {Subject} from "rxjs";
import {concatMap, takeUntil} from 'rxjs/operators';
import {UsersService} from "../../users.service";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {Shared} from "../../shared/shared";

@Component({
  selector: 'app-post',
  templateUrl: './confession.component.html',
  styleUrls: ['./confession.component.css']
})
export class ConfessionComponent implements OnInit {
  private ngUnsubscribe = new Subject();
id: string;
confession;
isConfessionOwner: boolean;
isLoggedIn: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private confessionsService: ConfessionsService,
              private usersService: UsersService,
              private location: Location,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    //resolver data
    this.confession = this.route.snapshot.data['confession'];
    this.usersService.loggedInUser
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (user: any) => {
          this.isLoggedIn = (user != null);
          this.isConfessionOwner = (user && user.id == this.confession.author.id);
        }
      );
    this.confessionsService.isConfessionChanged
      .pipe(
        concatMap(
          () => { return this.confessionsService.getConfession(this.id); }
          ),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (response: any) => {
          this.confession = response;
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
        (response: any) => {
          this.router.navigate(['/'],
            {state: {toastrMessage: response.message, toastrTitle: 'Delete confession'}});
        },
        (err) => {
          this.toastrService.error(err.error, 'Delete confession error');
        }
      );
  }

  onComment(){
    this.router.navigate(['comments', 'new'], {relativeTo: this.route});
  }

}
