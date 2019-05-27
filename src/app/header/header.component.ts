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

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.loggedInUser
      .subscribe(
        (user: any) => {
            this.loggedInUser = (user ? user.username : null);
        }
      );
  }

  onLogout(){
    const user = this.loggedInUser;
    const logoutMessage = "User '" + user + "' logged out successfully!";
    this.usersService.logout(logoutMessage);
  }

}
