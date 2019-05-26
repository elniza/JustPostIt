import { Component, OnInit } from '@angular/core';
import {UsersService} from "../users.service";
import {Subscribable, Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedInUser: string;
//subscription: Subscription;

  constructor(private usersService: UsersService,
              private toastrService: ToastrService) { }

  ngOnInit() {
    /*this.subscription = */this.usersService.loggedInUser
      .subscribe(
        (user: object) => {
            this.loggedInUser = (user ? user.username : null);
        }
      );
  }

  onLogout(){
    const user = this.loggedInUser;
    this.usersService.logout();
    this.toastrService.success("User '" + user + "' logged out successfully!", 'Logged out');
  }

  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }

}
