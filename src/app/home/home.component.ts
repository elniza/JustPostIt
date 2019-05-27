import { Component, OnInit } from '@angular/core';
import {ConfessionsService} from "../confessions.service";
import {Confession} from "../models/confession.model";
import {UsersService} from "../users.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Shared} from "../shared/shared";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  confessions;
  isLoggedIn: boolean;

  constructor(private confessionsService: ConfessionsService,
              private usersService: UsersService,
              private route: ActivatedRoute,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.confessions = this.route.snapshot.data['confessions'];
    this.usersService.loggedInUser
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (user: object) => {
        this.isLoggedIn = (user != null);
      });

  }
  ngAfterViewInit() {
    Shared.showFlashMessageIfNeeded(this.toastrService);
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
