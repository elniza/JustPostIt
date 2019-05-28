import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth/auth.service";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class RoutesService implements CanActivate{

  constructor(private authService: AuthService,
              private router: Router,
              private toastrService: ToastrService) {}

  ngOnInit() {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(!this.authService.getToken()){
      //the real token check will be in the backend
      this.router.navigate(['login']);
      this.toastrService.error("Don't be a smartass, you aren't logged in", 'Unauthorized');
      return false;
    }
     return true;
  }
}
