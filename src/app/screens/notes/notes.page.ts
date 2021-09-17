import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/models/note/note';
import { NotesService } from 'src/app/services/notes/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit, OnDestroy {
  notes: Note[] = [];
  notesSubscription: Subscription;

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.notesSubscription = this.notesService.notesSubject.subscribe(
      (observer) => {
        this.notes = observer;
        console.log(this.notes);
      }
    );

    this.notesService.emitNotesSubject();
    this.notesService.getNotes();
  }

  ngOnDestroy() {
    this.notesSubscription.unsubscribe();
  }

  onClickNote(note) {
    console.log(note);
  }
}
