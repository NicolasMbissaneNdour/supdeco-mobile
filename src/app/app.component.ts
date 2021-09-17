import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from './models/user/user';
import { AuthService } from './services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuth: Boolean = false;
  user: User;
  isAuthSubscription: Subscription;
  userSubscription: Subscription;

  public appPages = [
    { title: 'Acceuil', url: '/home', icon: 'home', show: true },
    { title: 'Events', url: '/events', icon: 'calendar', show: true },
  ];
  public labels = [
    {
      title:'+221 33 849 69 19',
      icon: 'call',
    },
    {
      title:'supdeco@supdeco.sn',
      icon: 'mail',
    },
    {
      title:'supdeco-dakar',
      icon: 'logo-linkedin',
    },
    {
      title:'@SupdeCoDakar',
      icon: 'logo-twitter',
    },
  ]
  constructor(private authService: AuthService, private toastController: ToastController) {}

  ngOnInit() {
    this.isAuthSubscription = this.authService.isAuthSubject.subscribe(
      (observer) => {
        this.isAuth = observer;
        console.log(this.isAuth);
      }
    );
    this.authService.emitIsAuthSubject();

    this.userSubscription = this.authService.userSubject.subscribe(
      (observer) => {
        this.user = observer;
      }
    )
    this.authService.emitUserSubject();
  }

  ngOnDestroy() {
    this.isAuthSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async onLogout() {
    this.authService.logout();
    const toast = await this.toastController.create({
      message: 'Déconnexion!',
      position: 'bottom',
      color: 'danger',
      duration: 5000
    });
    await toast.present();
  }
}
