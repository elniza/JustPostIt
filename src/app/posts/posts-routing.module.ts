import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PostsComponent} from "./posts.component";
import {PostsResolverService} from "./posts-resolver.service";
import {PostEditComponent} from "./post-edit/post-edit.component";
import {RoutesGuardService} from "../routes-guard.service";
import {PostComponent} from "./post/post.component";
import {PostResolverService} from "./post/post-resolver.service";

const postsRoutes: Routes = [
      {path: '', component: PostsComponent, resolve: {posts: PostsResolverService}},
      {path: 'new', component: PostEditComponent, canActivate: [RoutesGuardService]},
      {path: ':id', component: PostComponent, resolve: {post: PostResolverService}},
      {path: ':id/edit', component: PostEditComponent, canActivate: [RoutesGuardService]},
      {path: ':id/comments', loadChildren: '../comments/comments.module#CommentsModule'}
    ];

@NgModule({
  imports: [
    RouterModule.forChild(postsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [PostsResolverService, PostResolverService]
})

export class PostsRoutingModule {

}
