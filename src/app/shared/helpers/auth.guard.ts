import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// App
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authenticationService.getCurrentUser();
    if (user) {
      return true;
    } else {
      this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    return true;

    // this.authenticationService.getUser().subscribe(user => {
    //   const expectedRole = route.data.expectedRole;
    //   if (user) {
    //     return true;

    // for (const item of expectedRole) {
    //   if (item.roles && item.roles.includes('ALL')) {
    //     this.menuItems.push(item);
    //     continue;
    //   }
    //   for (const role of userRoles) {
    //     if (item.roles && item.roles.includes(role)) {
    //       this.menuItems.push(item);
    //     }
    //   }
    // }


    // if (expectedRole && expectedRole.length > 0) {
    //   for (const rol of expectedRole) {
    //     if (rcurrentUser.roles[0]) {
    //       return true;
    //     }
    //   }
    //   this.router.navigate(['/dashboard']);
    //   return false;
    // } else if (route.data.roles && route.data.roles.indexOf(currentUser.access_token) === -1) {
    //   this.router.navigate(['/']);
    //   return false;
    // }
  }
}
