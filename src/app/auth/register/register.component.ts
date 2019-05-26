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

    this.usersService.saveUser(username, password)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (response: Response) => {
          this.router.navigate(['/']);
          this.toastrService.success(response.message, 'Signed up');
        },
        (err) => {
          this.toastrService.error(err.error, 'Sign up error');
        }
    );

  }

}
