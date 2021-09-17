import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Note } from 'src/app/models/note/note';
import { User } from 'src/app/models/user/user';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  user: User;
  userSubscription: Subscription;
  notes: Note[] = []
  notesSubject: Subject<Note[]> = new Subject<Note[]>();

  constructor(private authService: AuthService, private http: HttpClient) {
    this.userSubscription = this.authService.userSubject.subscribe(
      (observer) => {
        this.user = observer;
      }
    )

    this.authService.emitUserSubject();
  }

  async getNotes() {
    try {
      const headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'*',
        'Accept':'application/json, text/plain',
        'Authorization': `Bearer ${this.user.token}`
      })
      const result = await <any>this.http.get('http://localhost:8000/api/auth/notes',{headers:headers}).toPromise();
      //console.log(result);
      this.notes = result;
      this.emitNotesSubject(); 
      
    } catch (error) {
      console.log(error);
    }
  }
  
  emitNotesSubject() {
    this.notesSubject.next(this.notes.slice());
  }
}
