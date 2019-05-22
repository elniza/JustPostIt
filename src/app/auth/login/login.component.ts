import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UsersService} from "../../users.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usersService: UsersService,
              private toastrService: ToastrService,
              private router: Router) { }

  ngOnInit() {
  }

   onLogin(form: NgForm){
     const username = form.controls['username'].value;
     const password = form.controls['password'].value;
     this.usersService.login(username, password)
       .subscribe(
       (response: Response) => {
         this.router.navigate(['/']);
         this.toastrService.success(response.message, 'Logged in');
       },
       (err) => {
         this.toastrService.error(err.error, 'Login error');
       }
     );
   }

}
