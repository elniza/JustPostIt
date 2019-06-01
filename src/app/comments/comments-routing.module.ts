import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommentEditComponent} from "./comment-edit/comment-edit.component";
import {RoutesGuardService} from "../routes-guard.service";

const commentsRoutes: Routes = [
  {path: 'new', component: CommentEditComponent, canActivate: [RoutesGuardService]},
  {path: ':comment_id/edit', component: CommentEditComponent, canActivate: [RoutesGuardService]}
];

@NgModule({
  imports: [
    RouterModule.forChild(commentsRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class CommentsRoutingModule {

}
