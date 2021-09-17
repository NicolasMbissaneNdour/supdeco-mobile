import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: String;
  password: String;
  user: User ;
  userSubscription: Subscription;


  constructor(private authService: AuthService,private router: Router,private toastController: ToastController) { }

  ngOnInit() {
    this.userSubscription = this.authService.userSubject.subscribe(
      (observer) => {
        this.user = observer;
      }
    )
    this.authService.emitUserSubject();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async onLogin() {
    try {
      const result = await this.authService.login(this.email,this.password);
      if (result.status == 'ok') {
        this.router.navigate(['/home']);
        const toast = await this.toastController.create({
          message: 'Bienvenue '+ this.user.nom+' '+this.user.prenom,
          position: 'bottom',
          color: 'success',
          duration: 5000,
        });
        await toast.present();
    
      }
      else {
        console.log(result.mesage);
      }
    } catch (error) {
      console.log(error);
    }
    
  }

}
