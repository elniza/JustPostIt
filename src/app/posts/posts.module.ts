import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MinimizedPostComponent} from "./minimized-post/minimized-post.component";
import {PostComponent} from "./post/post.component";
import {PostEditComponent} from "./post-edit/post-edit.component";
import {PostsComponent} from "./posts.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {PostsRoutingModule} from "./posts-routing.module";
import {CommentModule} from "../comments/comment.module";

@NgModule({
  declarations: [
    MinimizedPostComponent,
    PostComponent,
    PostEditComponent,
    PostsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CommentModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
