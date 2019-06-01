import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AuthModule} from "./auth/auth.module";
import {CoreModule} from "./core/core.module";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {ToastNoAnimationModule} from "ngx-toastr";

@NgModule({
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
