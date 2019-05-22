import { Component, OnInit } from '@angular/core';
import {ConfessionsService} from "../confessions.service";
import {Confession} from "../models/confession.model";
import {FlashMessagesService} from "angular2-flash-messages";
import {UsersService} from "../users.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  confessions;
  isLoggedIn: boolean;
  constructor(private confessionsService: ConfessionsService,
              private  usersService: UsersService) { }

  ngOnInit() {
    this.usersService.isLoggedIn
      .subscribe((username: string) => {
        this.isLoggedIn = (username != null);
      });
    this.confessionsService.getConfessions()
      .subscribe((response: Response) => {
        this.confessions = (response.length == 0) ? null : response;
    });



  }
  showFlash(){
    // this.flashMessage.show("Working!");
  }

}
