import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit, OnDestroy {
  user: User;
  isAuth: Boolean;
  userSubcription: Subscription;
  isAuthSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userSubcription = this.authService.userSubject.subscribe(
      (observer) => {
        this.user = observer;
        console.log(this.user);
      }
    )
    this.authService.emitUserSubject();
    
    this.isAuthSubscription = this.authService.isAuthSubject.subscribe(
      (observer) => {
        this.isAuth = observer;
        //console.log(this.isAuth);
      }
    )
    this.authService.emitIsAuthSubject();
  }

  ngOnDestroy() {
    this.userSubcription.unsubscribe();
    this.isAuthSubscription.unsubscribe();

  }

  onClickEdit() {
    console.log("On click edit");
  }

}
