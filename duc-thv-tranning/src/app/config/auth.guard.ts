import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
  ): boolean {
    return this.checkAccess(route);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
  ): boolean {
    return this.checkAccess(childRoute);
  }

  private checkAccess(route: ActivatedRouteSnapshot): boolean {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      this.router.navigate(['/login']);
      return false;
    }

    const user = JSON.parse(userData);
    const userRole = user.role;

    const allowedRoles = route.data['roles'] as Array<string>;
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
