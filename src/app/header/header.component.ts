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

  isLoggedIn: string;
//subscription: Subscription;

  constructor(private usersService: UsersService,
              private toastrService: ToastrService) { }

  ngOnInit() {
    /*this.subscription = */this.usersService.isLoggedIn
      .subscribe(
        (loggedInBool: string) => {
          this.isLoggedIn = loggedInBool;
        }
      );
  }

  onLogout(){
    const user = this.isLoggedIn;
    this.usersService.logout();
    this.toastrService.success("User '" + user + "' logged out successfully!", 'Logged out');
  }

  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }

}
