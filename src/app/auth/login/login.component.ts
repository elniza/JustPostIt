import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UsersService} from "../../users.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Subject, Subscription} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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

   onLogin(form: NgForm){
     const username = form.controls['username'].value;
     const password = form.controls['password'].value;
     this.usersService.login(username, password)
       .pipe(
         takeUntil(this.ngUnsubscribe)
       )
       .subscribe(
       (response: Response) => {
         this.router.navigate(['/']);
         this.toastrService.success(response.message, 'Logged in');
       },
       (err) => {
         this.toastrService.error('Login error');
         console.log(err);
       }
     );
   }

}
