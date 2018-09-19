import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CanActivate } from "../../../node_modules/@angular/router/src";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";


@Injectable()
export class UrlPermission implements CanActivate{
  
    constructor(private router: Router){} 
     
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (localStorage.getItem('user')){
        //this.router.navigate(['/view']);
        return true;
        
        
      } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}