import {Injectable} from "@angular/core";
import {UsersService} from "./app/users.service";

@Injectable()
export class RoutesService {


  constructor(private usersService: UsersService) {
  }

  ngOnInit() {

  }
}
