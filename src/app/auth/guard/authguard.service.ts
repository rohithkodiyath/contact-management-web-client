import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {map, Observable, of} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {UserService} from "../../services/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class Authguard implements CanActivate{


  constructor(private router: Router,
              private authService : AuthService,
              private userService : UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.userService.getUser().pipe(
        map((response)=>{
            return true;
        },
        (error)=>{
          this.router.navigate(['/login']);
          return of(false);
        })
    );
  }

}
