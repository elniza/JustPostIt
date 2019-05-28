import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../users.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {takeUntil} from "rxjs/operators";
import {FormValidator} from "../form.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  form: FormGroup;
  username: FormControl;
  password: FormControl;

  constructor(private usersService: UsersService,
              private toastrService: ToastrService,
              private router: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.username = new FormControl("", [
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
        FormValidator.startsWithLetter]
      )]);
    this.password = new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      FormValidator.hasLower,
      FormValidator.hasUpper,
      FormValidator.hasNumber,
      FormValidator.hasSpecialCharacter
    ]);
    this.form = this.formBuilder.group({
      username: this.username,
      password: this.password
    });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSignUp(){
   const { username, password } = this.form.value;
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
