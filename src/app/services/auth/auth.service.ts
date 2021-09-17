import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth: boolean;
  token: String;
  user: User = new User();
  httpSubscripion: Subscription;
  isAuthSubject: Subject<boolean> = new Subject<boolean>();
  userSubject: Subject<User> = new Subject<User>();

  constructor(private http: HttpClient,private router: Router) { }

  async login(email: String, password: String) {
    console.log(email,password);
    try {
      const result = await <any>this.http.post('http://localhost:8000/api/auth/login',{email,password}).toPromise();
      if (result.error) {
        return { status: 'error', mesage: 'Email ou mot de passe incorect!' }
      }
      this.updateUser(result);
      this.isAuth = true;
      this.emitIsAuthSubject();
      return { status: 'ok', mesage: 'Connecté!' };
    } catch (error) {
      console.log(error);
      if (error.status && error.status == 401) {
        return { status: 'error', mesage: 'Email ou mot de passe incorect!' }
      }
      return { status: 'error', mesage: 'Erreur interne rééssayez!' }
      //return false;
    }
    
  }

  async logout() {
    this.isAuth = false;
    this.emitIsAuthSubject();
    this.router.navigate(['/home']);
  }

  emitIsAuthSubject() {
    this.isAuthSubject.next(this.isAuth);
  }

  emitUserSubject() {
    this.userSubject.next(this.user);
  }
  
  private updateUser(result) {
    this.user.id = result.user.id;
    this.user.email = result.user.email;
    this.user.nom = result.user.nom;
    this.user.prenom = result.user.prenom;
    this.user.nationalite = result.user.nationalite;
    this.user.telephone = result.user.telephone
    this.user.token = result.access_token;
    this.emitUserSubject();
  }
}
