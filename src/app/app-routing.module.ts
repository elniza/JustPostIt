import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AboutComponent} from "./header/about/about.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./home/home.component";
import {PostComponent} from "./confessions/post/post.component";
import {PostEditComponent} from "./confessions/post-edit/post-edit.component";
import {RoutesService} from "./routes.service";
import {CommentEditComponent} from "./comments/comment-edit/comment-edit.component";
import {PostResolverService} from "./confessions/post/post-resolver.service";
import {PostsResolverService} from "./confessions/posts-resolver.service";
import {NotFoundComponent} from "./not-found/not-found.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent, resolve: {posts: PostsResolverService}},
  {path: 'about', component: AboutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'posts', children: [
      {path: 'new', component: PostEditComponent, canActivate: [RoutesService]},
      {
        path: ':id', children: [
          {path: '', component: PostComponent, resolve: {post: PostResolverService}},
          {path: 'edit', component: PostEditComponent, canActivate: [RoutesService]},
          {
            path: 'comments', children: [
              {path: 'new', component: CommentEditComponent, canActivate: [RoutesService]},
              {path: ':comment_id/edit', component: CommentEditComponent, canActivate: [RoutesService]}
            ]
          }
        ]
      },
    ]
  },
  {path: '**', component: NotFoundComponent}
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [PostResolverService, PostsResolverService]
})
export class AppRoutingModule {

}
