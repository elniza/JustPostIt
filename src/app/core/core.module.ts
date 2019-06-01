import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {AboutComponent} from "./header/about/about.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {PostsService} from "../posts/posts.service";
import {CommentsService} from "../comments/comments.service";
import {RoutesGuardService} from "../routes-guard.service";
import {AuthService} from "../auth/auth.service";
import {AppRoutingModule} from "../app-routing.module";


@NgModule({
  declarations: [
    HeaderComponent,
    AboutComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [PostsService, AuthService, RoutesGuardService, CommentsService]
})
export class CoreModule { }
