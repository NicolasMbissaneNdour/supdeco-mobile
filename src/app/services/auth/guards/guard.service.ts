import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{
  isAuth: Boolean;
  isAuthSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService) { 
    this.isAuthSubscription = this.authService.isAuthSubject.subscribe(
      (observer) => {
        this.isAuth = observer;
      }
    )
    this.authService.emitIsAuthSubject();
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    this.authService.emitIsAuthSubject();
    if(!this.isAuth) {
      this.router.navigate(['/login']);
    }
    return true ;
  }

}
