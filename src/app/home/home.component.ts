import {Component, OnInit} from '@angular/core';
import {PostsService} from "../posts/posts.service";
import {AuthService} from "../auth/auth.service";
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
  posts;
  isLoggedIn: boolean;

  constructor(private postsService: PostsService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    //resolver data
    this.posts = this.route.snapshot.data['posts'];
    this.authService.loggedInUser
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
