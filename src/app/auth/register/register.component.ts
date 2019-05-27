import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UsersService} from "../../users.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {NgFlashMessageService} from "ng-flash-messages";
import {Router} from "@angular/router";
import {Subject, Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  
  constructor(private usersService: UsersService,
              private toastrService: ToastrService,
              private router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSignUp(form: NgForm){
    const username = form.controls['username'].value;
    const password = form.controls['password'].value;

    this.usersService.signUp(username, password)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (response: any) => {
          this.router.navigate(['/'], {state: {toastrMessage: response.message, toastrTitle: 'Signed up'}});
        },
        (err) => {
          this.toastrService.error(err.error, 'Sign up error');
        }
    );

  }

}
