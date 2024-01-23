// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];

    if (!this.authService.isAuthenticated() || this.authService.getUserRole() !== expectedRole) {
        console.log(this.authService.getUserRole(),"Phani")
      // User is not authenticated or does not have the expected role
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
