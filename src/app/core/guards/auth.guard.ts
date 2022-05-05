import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, delay } from 'rxjs';
import { AuthService } from 'src/app/features/authentication/services/auth.service';
import { SnackBarMessageComponent } from 'src/app/shared/components/snack-bar-message/snack-bar-message.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router,
    public snackBar: MatSnackBar
  ){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn === false) {

      this.snackBar.openFromComponent(SnackBarMessageComponent, {
        data: "Can't access",
        duration: 1500
      });

      this.router.navigate(['sign-in'])
      return false;
    }
    return true;
  }
}
