import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AboutComponent} from "./header/about/about.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./home/home.component";
import {ConfessionComponent} from "./confessions/confession/confession.component";
import {ConfessionEditComponent} from "./confession-edit/confession-edit.component";
import {RoutesService} from "./routes.service";
import {CommentEditComponent} from "./comment-edit/comment-edit.component";
import {ConfessionResolverService} from "./confession-resolver.service";
import {ConfessionsResolverService} from "./confessions-resolver.service";

const appRoutes: Routes = [
  {path: '', component: HomeComponent, resolve: {confessions: ConfessionsResolverService}},
  {path: 'about', component: AboutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'confessions/new', component: ConfessionEditComponent, canActivate: [RoutesService]},
  {path: 'confessions/:id', component: ConfessionComponent, resolve: {confession: ConfessionResolverService}},
  {path: 'confessions/:id/edit', component: ConfessionEditComponent, canActivate: [RoutesService]},
  {path: 'confessions/:id/comments/new', component: CommentEditComponent},
  {path: 'confessions/:id/comments/:comment_id/edit', component: CommentEditComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule],
  providers: [ConfessionResolverService, ConfessionsResolverService]
})
export class RoutingModule{

}
