import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedInUser: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.loggedInUser
      .subscribe(
        (user: any) => {
          this.loggedInUser = (user ? user.username : null);
        }
      );
  }

  onLogout() {
    const user = this.loggedInUser;
    const logoutMessage = "User '" + user + "' logged out successfully!";
    this.authService.logout(logoutMessage);
  }

}
