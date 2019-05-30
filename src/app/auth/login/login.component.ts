import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  form: FormGroup;
  username: FormControl;
  password: FormControl;

  constructor(private authService: AuthService,
              private toastrService: ToastrService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    //we did all the checks in register component
    this.username = new FormControl("", Validators.required);
    this.password = new FormControl("", Validators.required);
    this.form = this.formBuilder.group({
      username: this.username,
      password: this.password
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onLogin() {
    const {username, password} = this.form.value;
    this.authService.login(username, password)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (response: any) => {
          this.router.navigate(['/'], {state: {toastrMessage: response.message, toastrTitle: 'Logged in'}});
        },
        (err) => {
          this.toastrService.error(err.error, 'Login error');
        }
      );
  }

}
