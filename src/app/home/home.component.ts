import { Component, OnInit } from '@angular/core';
import {ConfessionsService} from "../confessions.service";
import {Confession} from "../models/confession.model";
import {UsersService} from "../users.service";
import {Subject, Subscription} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

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
              private  usersService: UsersService,
              private route: ActivatedRoute) { }

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

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
