import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AboutComponent} from './header/about/about.component';
import {AppRoutingModule} from "./app-routing.module";
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import {PostsService} from "./posts/posts.service";
import {MinimizedPostComponent} from './home/minimized-post/minimized-post.component';
import {PostComponent} from './posts/post/post.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./auth/auth.service";
import {PostEditComponent} from './posts/post-edit/post-edit.component';
import {HttpClientModule} from "@angular/common/http";
import {ToastNoAnimationModule} from "ngx-toastr";
import {RoutesService} from "./routes.service";
import {CommentEditComponent} from './comments/comment-edit/comment-edit.component';
import {CommentsService} from "./comments/comments.service";
import {CommentComponent} from './comments/comment/comment.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    MinimizedPostComponent,
    PostComponent,
    PostEditComponent,
    CommentEditComponent,
    CommentComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
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
  providers: [PostsService, AuthService, RoutesService, CommentsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
