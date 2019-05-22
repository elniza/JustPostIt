import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UsersService} from "./users.service";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class RoutesService implements CanActivate{


  constructor(private usersService: UsersService,
              private router: Router,
              private toastrService: ToastrService
              ) {
  }

  ngOnInit() {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    //need to add if token is valid and not blacklisted
    if(!this.usersService.getToken()){
      this.router.navigate(['login']);
      this.toastrService.error("Don't be a smartass, you aren't logged in", 'Unauthorized');
      return false;
    }
    return true;
  }
}
