import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {AboutComponent} from "./header/about/about.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./home/home.component";
import {ConfessionComponent} from "./confessions/confession/confession.component";
import {ConfessionEditComponent} from "./confession-edit/confession-edit.component";
import {RoutesService} from "./routes.service";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'new', component: ConfessionEditComponent, canActivate: [RoutesService]},
  {path: 'confessions/:id', component: ConfessionComponent},
  {path: 'confessions/:id/edit', component: ConfessionEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RoutingModule{

}
