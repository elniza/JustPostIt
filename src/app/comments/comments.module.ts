import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommentEditComponent} from "./comment-edit/comment-edit.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommentsRoutingModule} from "./comments-routing.module";
import {CommentModule} from "./comment.module";

@NgModule({
  declarations: [
    CommentEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommentModule,
    CommentsRoutingModule
  ]
})
export class CommentsModule { }
