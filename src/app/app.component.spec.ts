import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {AuthModule} from "./auth/auth.module";
import {HttpClientModule} from "@angular/common/http";
import {ToastNoAnimationModule} from "ngx-toastr";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        CoreModule,
        HttpClientModule,
        ToastNoAnimationModule.forRoot(
          {
            preventDuplicates: true,
            closeButton: true
          })
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
