import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class RoutePermission implements CanActivate{
  
    constructor(private router: Router){} 
     
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (localStorage.getItem('user') == null){
        //this.router.navigate(['/home']);
        return true;
        
        
      } else {
      this.router.navigate(['/view']);
      return false;
    }
  }
}