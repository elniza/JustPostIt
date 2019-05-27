import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './header/about/about.component';
import {RoutingModule} from "./routing.module";
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import {ConfessionsService} from "./confessions.service";
import { MinimizedConfessionComponent } from './home/minimized-confession/minimized-confession.component';
import { ConfessionComponent } from './confessions/confession/confession.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersService} from "./users.service";
import { ConfessionEditComponent } from './confession-edit/confession-edit.component';
import {HttpClientModule} from "@angular/common/http";
import {ToastNoAnimationModule} from "ngx-toastr";
import {RoutesService} from "./routes.service";
import { CommentEditComponent } from './comment-edit/comment-edit.component';
import {CommentsService} from "./comments.service";
import { CommentComponent } from './comment/comment.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    MinimizedConfessionComponent,
    ConfessionComponent,
    ConfessionEditComponent,
    CommentEditComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastNoAnimationModule.forRoot(
      {
        preventDuplicates: true,
        closeButton: true
      }
    )
  ],
  providers: [ConfessionsService, UsersService, RoutesService, CommentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
